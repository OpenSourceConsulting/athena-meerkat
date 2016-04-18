package com.athena.meerkat.controller.web.resources;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.athena.meerkat.controller.MeerkatConstants;
import com.athena.meerkat.controller.web.common.model.GridJsonResponse;
import com.athena.meerkat.controller.web.common.model.SimpleJsonResponse;
import com.athena.meerkat.controller.web.entities.ClusteringConfiguration;
import com.athena.meerkat.controller.web.entities.ClusteringConfigurationVersion;
import com.athena.meerkat.controller.web.entities.DatagridServerGroup;
import com.athena.meerkat.controller.web.entities.TomcatDomain;
import com.athena.meerkat.controller.web.resources.services.ClusteringConfigurationService;
import com.athena.meerkat.controller.web.resources.services.DataGridServerGroupService;
import com.athena.meerkat.controller.web.tomcat.services.TomcatDomainService;
import com.athena.meerkat.controller.web.tomcat.viewmodels.ClusteringConfComparisionViewModel;

@Controller
@RequestMapping("/clustering")
public class ClusteringConfigurationController {

	@Autowired
	ClusteringConfigurationService service;
	@Autowired
	DataGridServerGroupService datagridServerGroupService;
	@Autowired
	TomcatDomainService domainService;

	@RequestMapping(value = "/config/save", method = RequestMethod.POST)
	public @ResponseBody SimpleJsonResponse saveClusteringConfig(
			SimpleJsonResponse json, ClusteringConfiguration config,
			Integer objectId, String objectType) {
		ClusteringConfigurationVersion latestVersion = new ClusteringConfigurationVersion();
		ClusteringConfigurationVersion versionObj = new ClusteringConfigurationVersion();
		List<ClusteringConfiguration> confs = null;

		if (objectType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
			TomcatDomain domain = domainService.getDomain(objectId);
			config.setTomcatDomain(domain);

			latestVersion = service
					.getLatestClusteringConfVersionByDomain(domain.getId());
			if (latestVersion == null) {
				versionObj.setVersion(1);
			} else {
				confs = service.getClusteringConfByDomain(domain,
						latestVersion.getId());
				versionObj.setVersion(latestVersion.getVersion() + 1);
			}
		} else if (objectType
				.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {

			DatagridServerGroup group = datagridServerGroupService
					.getGroup(objectId);
			config.setDatagridServerGroup(group);
			latestVersion = service
					.getLatestClusteringConfVersionByServerGroup(group.getId());
			if (latestVersion == null) {
				versionObj.setVersion(1);
			} else {
				confs = service.getClusteringConfByServerGroup(group,
						latestVersion.getId());
				versionObj.setVersion(latestVersion.getVersion() + 1);
			}

		}
		versionObj.setCreatedTime(new Date());
		versionObj = service.saveCluteringConfVersion(versionObj);
		List<ClusteringConfiguration> cloneConfs = new ArrayList<ClusteringConfiguration>();
		if (confs != null) {
			for (ClusteringConfiguration c : confs) {
				if (c.getId() != config.getId()) { // dont clone the edited
													// config
					ClusteringConfiguration clone = (ClusteringConfiguration) c
							.clone();
					if (clone != null) {
						clone.setClusteringConfigurationVersion(versionObj);
						cloneConfs.add(clone);
					}
				}
			}
			// TODO idkbj apply to clustering server
			service.saveClusteringConfigs(cloneConfs);

			if (config.getId() != 0) {
				// reset id for editing case
				config.setId(0);
			}
			config.setClusteringConfigurationVersion(versionObj);
			service.saveClusteringConfig(config);
			json.setData(versionObj.getId());
			json.setSuccess(true);
		}

		return json;
	}

	@RequestMapping(value = "/config/edit", method = RequestMethod.POST)
	public @ResponseBody SimpleJsonResponse editClusteringConfig(
			SimpleJsonResponse json, int id) {
		ClusteringConfiguration config = service.getClusteringConfig(id);
		json.setData(config);
		return json;
	}

	@RequestMapping(value = "/config/delete", method = RequestMethod.POST)
	public @ResponseBody SimpleJsonResponse deleteClusteringConfig(
			SimpleJsonResponse json, int id, String objType) {
		ClusteringConfiguration config = service.getClusteringConfig(id);
		ClusteringConfigurationVersion latestVersion = new ClusteringConfigurationVersion();
		List<ClusteringConfiguration> confs = null;
		if (objType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
			latestVersion = service
					.getLatestClusteringConfVersionByDomain(config
							.getTomcatDomainId());
		} else if (objType
				.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {
			latestVersion = service
					.getLatestClusteringConfVersionByServerGroup(config
							.getDatagridServerGroup().getId());
		}
		// if this is not latest version, just delete
		if (config.getClusteringConfigurationVersion().getId() != latestVersion
				.getId()) {
			service.deleteClusteringConfig(config);
			json.setData(latestVersion.getId());
		} else {
			ClusteringConfigurationVersion versionObj = new ClusteringConfigurationVersion();
			versionObj.setCreatedTime(new Date());
			versionObj.setVersion(latestVersion.getVersion() + 1);
			versionObj = service.saveCluteringConfVersion(versionObj);
			if (objType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
				confs = service.getClusteringConfByDomain(
						config.getTomcatDomain(), latestVersion.getId());
			} else if (objType
					.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {
				confs = service.getClusteringConfByServerGroup(
						config.getDatagridServerGroup(), latestVersion.getId());
			}
			List<ClusteringConfiguration> cloneConfs = new ArrayList<ClusteringConfiguration>();
			if (confs != null) {
				for (ClusteringConfiguration c : confs) {
					if (c.getId() != config.getId()) {
						ClusteringConfiguration clone = (ClusteringConfiguration) c
								.clone();
						if (clone != null) {
							clone.setClusteringConfigurationVersion(versionObj);
							cloneConfs.add(clone);
						}
					}
				}
				// TODO idkbj apply to clustering servers
				service.saveClusteringConfigs(cloneConfs);
			}
			json.setData(versionObj.getId());
		}

		json.setSuccess(true);

		return json;
	}

	@RequestMapping(value = "config/{versionId}/search/{keyword}", method = RequestMethod.GET)
	public @ResponseBody GridJsonResponse searchClusteringConfig(
			GridJsonResponse json, Integer objectId, String objectType,
			@PathVariable int versionId, @PathVariable String keyword) {
		List<ClusteringConfiguration> list = null;
		if (objectType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
			list = service.searchClusteringConfByDomainAndVersionAndName(
					objectId, versionId, keyword);
		} else if (objectType
				.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {
			list = service.searchClusteringConfByServerGroupAndVersionAndName(
					objectId, versionId, keyword);
		}
		json.setList(list);
		json.setTotal(list.size());
		return json;
	}

	@RequestMapping(value = "config/latest", method = RequestMethod.GET)
	public @ResponseBody SimpleJsonResponse getLatestClusteringVersion(
			SimpleJsonResponse json, Integer objectId, String objectType) {
		ClusteringConfigurationVersion latestVersion = null;
		if (objectType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
			latestVersion = service
					.getLatestClusteringConfVersionByDomain(objectId);
		} else if (objectType
				.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {
			latestVersion = service
					.getLatestClusteringConfVersionByServerGroup(objectId);
		}
		if (latestVersion != null) {
			json.setData(latestVersion.getId());
		}
		return json;
	}

	@RequestMapping(value = "config/compare/{firstVersion}/to/{secondVersion}", method = RequestMethod.GET)
	public @ResponseBody GridJsonResponse compareClusteringConfig(
			GridJsonResponse json, Integer objectId, String objectType,
			@PathVariable Integer firstVersion,
			@PathVariable Integer secondVersion) {
		List<ClusteringConfComparisionViewModel> viewmodels = null;

		viewmodels = service.getClusteringConfComparison(objectId, objectType,
				firstVersion, secondVersion);

		json.setList(viewmodels);
		json.setTotal(viewmodels.size());
		return json;
	}

	@RequestMapping(value = "config/{version}", method = RequestMethod.GET)
	public @ResponseBody GridJsonResponse getClusteringConf(
			GridJsonResponse json, Integer objectId, String objectType,
			@PathVariable Integer version) {
		List<ClusteringConfiguration> confs = new ArrayList<ClusteringConfiguration>();
		if (objectType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
			TomcatDomain td = domainService.getDomain(objectId);
			if (td != null) {
				confs = service.getClusteringConfByDomain(td, version);
			}
		} else if (objectType
				.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {
			DatagridServerGroup group = datagridServerGroupService
					.getGroup(objectId);
			if (group != null) {
				confs = service.getClusteringConfByServerGroup(group, version);
			}
		}

		json.setList(confs);
		json.setTotal(confs.size());

		return json;
	}

	@RequestMapping(value = "/config/versions", method = RequestMethod.GET)
	public @ResponseBody GridJsonResponse getClusteringVers(
			GridJsonResponse json, Integer objectId, String objectType) {
		List<ClusteringConfigurationVersion> versions = new ArrayList<ClusteringConfigurationVersion>();
		if (objectType.equals(MeerkatConstants.OBJ_TYPE_DOMAIN)) {
			TomcatDomain td = domainService.getDomain(objectId);
			if (td != null) {
				versions = service.getClusteringConfVersionsByDomain(td);
			}
		} else if (objectType
				.equals(MeerkatConstants.OBJ_TYPE_SESSION_SERVER_GROUP)) {
			DatagridServerGroup group = datagridServerGroupService
					.getGroup(objectId);
			if (group != null) {
				versions = service.getClusteringConfVersionsByGroup(group);
			}
		}
		json.setList(versions);
		json.setTotal(versions.size());
		return json;
	}
}