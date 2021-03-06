/* 
 * Athena Peacock Dolly - DataGrid based Clustering 
 * 
 * Copyright (C) 2014 Open Source Consulting, Inc. All rights reserved by Open Source Consulting, Inc.
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
 * Bong-Jin Kwon	2015. 1. 9.		First Draft.
 */
package com.athena.meerkat.controller.web.tomcat.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.athena.meerkat.controller.web.entities.TomcatInstance;

/**
 * <pre>
 * 
 * </pre>
 * 
 * @author Bong-Jin Kwon
 * @author Tran Ho
 * @version 2.0
 */
public interface TomcatInstanceRepository extends JpaRepository<TomcatInstance, Integer> {

	List<TomcatInstance> findByTomcatDomain_Id(int domainId);
	List<TomcatInstance> findByTomcatDomain_IdAndState(int domainId, int state);

	List<TomcatInstance> findByNameContainingAndTomcatDomain_Id(String name, int domainId);

	List<TomcatInstance> findByServer_Id(int serverId);
	
	TomcatInstance findByTomcatDomainIdAndServerId(int domainId, int serverId);

	/*@Modifying
	@Query("update TomcatInstance ti set ti.state = ?2 where ti.id = ?1")
	int setState(int instanceId, int state);
	*/
}
