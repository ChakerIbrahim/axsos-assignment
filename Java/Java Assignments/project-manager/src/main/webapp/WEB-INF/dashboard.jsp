<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%-- fmt: used to print the due dates nicely --%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Project Manager Dashboard</title>
	<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
	<style>
		* { margin: 0; padding: 0; box-sizing: border-box; }
		body { font-family: 'Space Grotesk', sans-serif;
			background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
			color: #eae8f0; min-height: 100vh; padding: 50px 6vw 80px; }
		.tag { font-family: 'JetBrains Mono', monospace; font-size: 12px;
			color: #ffb454; letter-spacing: 2px; text-transform: uppercase; }
		.topbar { display: flex; justify-content: space-between; align-items: flex-end;
			flex-wrap: wrap; gap: 20px; margin-bottom: 40px; }
		.who { display: flex; align-items: center; gap: 14px; }
		.who img { width: 56px; height: 56px; border-radius: 50%;
			object-fit: cover; border: 2px solid #ffb454; }
		h1 { font-size: 42px; margin-top: 6px; }
		h1 span { color: #ffb454; }
		.actions a { display: inline-block; padding: 11px 18px; font-size: 14px;
			font-weight: 700; border-radius: 8px; text-decoration: none; margin-left: 10px; }
		.newproj { background: #ffb454; color: #0f0e17; }
		.newproj:hover { filter: brightness(1.1); }
		.logout { color: #8f8ba3; border: 1px solid #2c2a3e; }
		.logout:hover { color: #eae8f0; border-color: #8f8ba3; }
		.section-head { display: flex; justify-content: space-between; align-items: baseline;
			margin: 38px 0 14px; }
		.section-head h2 { font-size: 22px; }
		.section-head h2 em { font-style: normal; color: #5eead4; }
		.count { font-family: 'JetBrains Mono', monospace; font-size: 12px; color: #8f8ba3; }
		table { width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03);
			border: 1px solid #2c2a3e; border-radius: 14px; overflow: hidden; }
		th, td { text-align: left; padding: 13px 16px; font-size: 15px; }
		th { font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
			letter-spacing: 2px; text-transform: uppercase; color: #5eead4;
			border-bottom: 1px solid #2c2a3e; }
		tbody tr { border-bottom: 1px solid #1d1b2b; }
		tbody tr:hover { background: rgba(255,180,84,0.05); }
		td a.title { color: #eae8f0; font-weight: 500; text-decoration: none; }
		td a.title:hover { color: #ffb454; }
		.act { font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;
			letter-spacing: 1px; text-transform: uppercase; text-decoration: none;
			margin-right: 12px; }
		.join { color: #ffb454; }
		.leave { color: #5eead4; }
		.editlnk { color: #5eead4; }
		.act:hover { text-decoration: underline; }
		form.inline { display: inline; }
		form.inline input[type="submit"] { background: none; border: none;
			font-family: 'JetBrains Mono', monospace; font-size: 12px; font-weight: 700;
			letter-spacing: 1px; text-transform: uppercase; color: #ff6b6b;
			cursor: pointer; padding: 0; }
		form.inline input[type="submit"]:hover { text-decoration: underline; }
		.empty { color: #8f8ba3; font-size: 14px; padding: 16px; }
	</style>
</head>
<body>

<div class="topbar">
	<div class="who">
		<%-- NINJA BONUS: the avatar picture stored at registration --%>
		<img src="${user.avatar}" alt="avatar">
		<div>
			<h1>Welcome, <span><c:out value="${user.firstName}" /></span>!</h1>
		</div>
	</div>
	<div class="actions">
		<a class="newproj" href="/projects/new">+ Create Blog</a>
		<a class="logout" href="/logout">logout</a>
	</div>
</div>

<%-- ============ TABLE 1 ============
     All the projects the user is NOT involved in --%>
<div class="section-head">
	<h2>All <em>Blogs</em></h2>
	<span class="count">${allProjects.size()} blogs</span>
</div>
<table>
	<thead>
	<tr>
		<th>Blog Title</th>
		<th>Author</th>
		<th>Created on</th>
		<th>Actions</th>
	</tr>
	</thead>
	<tbody>
	<c:forEach var="oneProject" items="${allProjects}">
		<tr>
			<td>
					<%-- The project title links to its details page --%>
				<a class="title" href="/projects/${oneProject.id}">
					<c:out value="${oneProject.title}" />
				</a>
			</td>
				<%-- The lead's name through the relationship: project -> lead --%>
			<td><c:out value="${oneProject.lead.firstName}" />
				<c:out value="${oneProject.lead.lastName}" /></td>
			<td><fmt:formatDate value="${oneProject.dueDate}" pattern="d MMM yyyy" /></td>
			<td>
					<%-- Join team: points the user's project foreign key
                         at this project --%>
				<a class="act join" href="/projects/${oneProject.id}">Read</a>
			</td>
		</tr>
	</c:forEach>
	<c:if test="${allProjects.size() == 0}">
		<tr><td class="empty" colspan="4">No other blogs right now.</td></tr>
	</c:if>
	</tbody>
</table>

<%-- ============ TABLE 2 ============
     All the projects the user IS involved in --%>
<div class="section-head">
	<h2>My <em>Blogs</em></h2>
	<span class="count">${yourProjects.size()} blogs</span>
</div>
<table>
	<thead>
	<tr>
		<th>Blog Title</th>
		<th>Author</th>
		<th>Created on</th>
		<th>Actions</th>
	</tr>
	</thead>
	<tbody>
	<c:forEach var="oneProject" items="${yourProjects}">
		<tr>
			<td>
				<a class="title" href="/projects/${oneProject.id}">
					<c:out value="${oneProject.title}" />
				</a>
			</td>
			<td><c:out value="${oneProject.lead.firstName}" />
				<c:out value="${oneProject.lead.lastName}" /></td>
			<td><fmt:formatDate value="${oneProject.dueDate}" pattern="d MMM yyyy" /></td>
			<td>
					<%-- If I am the LEAD: edit + delete
                         (a user is only able to edit and delete
                          projects they created).
                         Otherwise I JOINED it: leave team. --%>
				<c:choose>
					<c:when test="${oneProject.lead.id == user.id}">
						<a class="act editlnk" href="/projects/edit/${oneProject.id}">edit</a>
						<form class="inline" action="/projects/${oneProject.id}" method="post">
							<input type="hidden" name="_method" value="delete" />
							<input type="submit" value="delete" />
						</form>
					</c:when>
					<c:otherwise>
						<%-- Leave team: sets the user's project
                             foreign key back to null --%>
						<a class="act leave" href="/projects/${oneProject.id}/leave">Leave team</a>
					</c:otherwise>
				</c:choose>
			</td>
		</tr>
	</c:forEach>
	<c:if test="${yourProjects.size() == 0}">
		<tr><td class="empty" colspan="4">You are not involved in any blogs yet.</td></tr>
	</c:if>
	</tbody>
</table>
</body>
</html>