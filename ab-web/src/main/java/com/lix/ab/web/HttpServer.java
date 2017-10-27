/**
 * 
 */
package com.lix.ab.web;

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.webapp.WebAppContext;

/**
 *
 * @author lix Internet Banking System Group,CSII
 */
public class HttpServer {
	
	private int port = 8090;
	private String contextPath = "ab";
	private String resourceBase = "src/main/webapp";
	
	public void start() {
		// 服务器的监听端口
		Server server = new Server(port);
		// 关联一个已经存在的上下文
		WebAppContext context = new WebAppContext();
		// 设置描述符位置
		context.setDescriptor(resourceBase+"/WEB-INF/web.xml");
		// 设置Web内容上下文路径
		context.setResourceBase(resourceBase);
		// 设置上下文路径
		context.setContextPath("/"+contextPath);
		context.setParentLoaderPriority(true);
		server.setHandler(context);

		try {
			server.start();
			// server.join();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * @param port the port to set
	 */
	public void setPort(int port) {
		this.port = port;
	}

	/**
	 * @param contextPath the contextPath to set
	 */
	public void setContextPath(String contextPath) {
		this.contextPath = contextPath;
	}

	/**
	 * @param resourceBase the resourceBase to set
	 */
	public void setResourceBase(String resourceBase) {
		this.resourceBase = resourceBase;
	}
}
