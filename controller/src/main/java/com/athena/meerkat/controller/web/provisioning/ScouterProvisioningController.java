/* 
 * Copyright (C) 2012-2015 Open Source Consulting, Inc. All rights reserved by Open Source Consulting, Inc.
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; either version 2
 * of the License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Revision History
 * Author			Date				Description
 * ---------------	----------------	------------
 * BongJin Kwon		2016. 3. 21.		First Draft.
 */
package com.athena.meerkat.controller.web.provisioning;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.athena.meerkat.controller.web.common.model.SimpleJsonResponse;

/**
 * <pre>
 * 
 * </pre>
 * @author Bongjin Kwon
 * @version 1.0
 */
@Controller
@RequestMapping("/provi/scouter")
public class ScouterProvisioningController {

	private static final Logger LOGGER = LoggerFactory.getLogger(ScouterProvisioningController.class);
	
	@Autowired
	private ScouterProvisioningService proviService;

	
	@RequestMapping(value = "/install/agent/{tomcatInstanceId}", method = RequestMethod.POST)
	@ResponseBody
	public SimpleJsonResponse installScouterAgent(@PathVariable("tomcatInstanceId") int tomcatInstanceId, String scouterAgentInstallPath, String scouterAgentConfigs, int taskHistoryId, boolean isDefault) {
		
		proviService.installSingleScouterAgent(tomcatInstanceId, scouterAgentInstallPath, scouterAgentConfigs, taskHistoryId, isDefault);
		
		return new SimpleJsonResponse();
	}
	
	@RequestMapping(value = "/uninstall/agent/{tomcatInstanceId}", method = RequestMethod.POST)
	@ResponseBody
	public SimpleJsonResponse unintallScouterAgent(@PathVariable("tomcatInstanceId") int tomcatInstanceId, int taskHistoryId) {
		
		proviService.uninstallSingleScouterAgent(tomcatInstanceId, taskHistoryId);
		
		
		return new SimpleJsonResponse();
	}
	
	@RequestMapping(value = "/config/{domainId}", method = RequestMethod.GET)
	@ResponseBody
	public SimpleJsonResponse getConfig(SimpleJsonResponse jsonRes, @PathVariable("domainId") int domainId) {
		
		jsonRes.setData(proviService.getAgentConfig(domainId));
		
		return jsonRes;
	}
	

}
//end of ProvisioningController.java
