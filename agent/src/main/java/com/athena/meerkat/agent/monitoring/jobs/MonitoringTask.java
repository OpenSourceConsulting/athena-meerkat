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
 * BongJin Kwon		2016. 4. 11.		First Draft.
 */
package com.athena.meerkat.agent.monitoring.jobs;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.athena.meerkat.agent.monitoring.websocket.StompWebSocketClient;

/**
 * <pre>
 * 
 * </pre>
 * @author Bongjin Kwon
 * @version 1.0
 */
public abstract class MonitoringTask {
	
	@Autowired
    protected StompWebSocketClient webSocketClient;

	/**
	 * <pre>
	 * 
	 * </pre>
	 */
	public MonitoringTask() {
	}
	
	/**
	 * <pre>
	 * json generate & send json to controller.
	 * </pre>
	 * @param jsons
	 * @throws IOException
	 */
	protected void sendMonData(List<String> monDatas) throws IOException {
		
		String message = createJsonArrayString(monDatas);
		
		webSocketClient.sendMessage(message);
	}
	
	protected void sendInstanceMonData(List<String> monDatas) throws IOException {
		
		String message = createJsonArrayString(monDatas);
		
		webSocketClient.sendJmxMessage(message);
	}
	
	protected void sendFSMonData(List<String> monDatas) throws IOException {
		
		String message = createJsonArrayString(monDatas);
		
		webSocketClient.sendFSMessage(message);
	}
	
	abstract public void monitor();
	
	protected String createJsonString(String monFactorId, String serverId, double value){
		return "{\"monFactorId\":\""+ monFactorId +"\",\"serverId\": "+serverId+" ,\"monValue\": "+value+"}";
	}
	
	protected String createJmxJsonString(String monFactorId, String instanceId, double value, double value2){
		return "{\"monFactorId\":\""+ monFactorId +"\",\"instanceId\": "+instanceId+" ,\"monValue\": "+value+" ,\"monValue2\": "+value2+"}";
	}
	
	protected String createFSJsonString(String serverId, String fsName, long total, long used, double usePer, long avail){
		return "{\"serverId\":"+ serverId +",\"fsName\": \""+fsName+"\" ,\"total\": "+total+" ,\"used\": "+used+" ,\"usePer\": "+usePer+" ,\"avail\": "+avail+"}";
	}
	
	protected String createJsonArrayString(List<String> monDatas) {
		StringBuffer sb = new StringBuffer();
		sb.append("[");
		
		boolean more = false;
		
		for (String json : monDatas) {
			
			if (more) {
				sb.append(",");
			}
			
			sb.append(json);
			more = true;
		}
		
		sb.append("]");
		
		return sb.toString();
	}
	
}
//end of MonitoringTask.java