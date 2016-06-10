package com.athena.meerkat.controller.web.tomcat.services;

import java.io.File;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.athena.meerkat.controller.MeerkatConstants;
import com.athena.meerkat.controller.web.entities.TaskHistory;
import com.athena.meerkat.controller.web.entities.TaskHistoryDetail;
import com.athena.meerkat.controller.web.entities.TomcatInstance;
import com.athena.meerkat.controller.web.tomcat.repositories.TaskHistoryDetailRepository;
import com.athena.meerkat.controller.web.tomcat.repositories.TaskHistoryRepository;

/**
 * <pre>
 * 
 * </pre>
 * 
 * @author Bong-Jin Kwon
 * @version 1.0
 */
@Service
public class TaskHistoryService {

	@Autowired
	private TaskHistoryRepository repository;

	@Autowired
	private TaskHistoryDetailRepository detailRepo;

	public TaskHistoryService() {

	}

	private TaskHistory createTask(int taskCdId) {
		TaskHistory task = new TaskHistory();
		task.setTaskCdId(taskCdId);

		return task;
	}

	public List<TaskHistoryDetail> getTaskHistoryDetailList(int taskHistoryId) {
		return detailRepo.findByTaskHistoryIdOrderByTomcatDomainIdAscTomcatInstanceIdAsc(taskHistoryId);
	}

	public TaskHistory createTomcatInstallTask(List<TomcatInstance> tomcats) {

		TaskHistory task = createTask(MeerkatConstants.TASK_CD_TOMCAT_INSTALL);

		save(task);

		List<TaskHistoryDetail> taskDetails = new ArrayList<TaskHistoryDetail>();
		for (TomcatInstance tomcatInstance : tomcats) {
			TaskHistoryDetail taskDetail = new TaskHistoryDetail(task.getId(), tomcatInstance);
			taskDetails.add(taskDetail);
		}

		detailRepo.save(taskDetails);

		return task;
	}

	public void save(TaskHistory taskHistory) {
		repository.save(taskHistory);
	}

	public void saveDetail(TaskHistoryDetail taskHistoryDetail) {
		detailRepo.save(taskHistoryDetail);
	}

	public void updateTaskLogFile(int taskHistoryId, int tomcatInstanceId, File jobDir) {

		TaskHistoryDetail taskDetail = detailRepo.findByTaskHistoryIdAndTomcatInstanceId(taskHistoryId, tomcatInstanceId);
		taskDetail.setLogFilePath(jobDir.getAbsolutePath() + File.separator + "build.log");
		taskDetail.setStatus(MeerkatConstants.TASK_STATUS_WORKING);
		taskDetail.setFinishedTime(null);

		saveDetail(taskDetail);
	}

	public void updateTaskStatus(int taskHistoryId, int tomcatInstanceId, int status) {

		TaskHistoryDetail taskDetail = detailRepo.findByTaskHistoryIdAndTomcatInstanceId(taskHistoryId, tomcatInstanceId);
		taskDetail.setStatus(status);

		if (status > 1) {
			taskDetail.setFinishedTime(new Date());
		}
		
		saveDetail(taskDetail);
	}


	public void updateTomcatInstanceToNull(int tomcatInstanceId) {
		List<TaskHistoryDetail> taskDetails = detailRepo.findByTomcatInstanceId(tomcatInstanceId);
		for (TaskHistoryDetail taskHistoryDetail : taskDetails) {
			taskHistoryDetail.setTomcatInstance(null);
		}
		
		detailRepo.save(taskDetails);
	}


	public TaskHistory getTaskHistory(int taskId) {
		return repository.findOne(taskId);
	}

	public void delete(int taskId) {
		repository.delete(taskId);
	}
	
	public TaskHistoryDetail getTaskHistoryDetail(int taskDetailId){
		return detailRepo.findOne(taskDetailId);
	}

	public List<TaskHistoryDetail> getTaskHistoryDetailListByDomain(Integer domainId) {

		return detailRepo.findByTomcatDomainId(domainId);
	}

}
//end of TaskHistoryService.java