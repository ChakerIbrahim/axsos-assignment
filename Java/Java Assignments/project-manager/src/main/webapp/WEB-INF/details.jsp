<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Project Details</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body { font-family: 'Space Grotesk', sans-serif;
		background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
		color: #eae8f0; min-height: 100vh;
		display: flex; justify-content: center; padding-top: 70px; }
	.wrap { width: 620px; }
	.back { display: inline-block; font-family: 'JetBrains Mono', monospace;
		font-size: 12px; color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase;
		text-decoration: none; margin-bottom: 16px; }
	.back:hover { color: #5eead4; }
	.tag { font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #ffb454; letter-spacing: 2px; text-transform: uppercase; }
	h1 { font-size: 38px; margin: 8px 0 24px; }
	.panel { background: rgba(255,255,255,0.03); border: 1px solid #2c2a3e;
		border-radius: 14px; padding: 26px 24px; }
	.row { margin-bottom: 14px; }
	.row .k { font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase; }
	.row .v { margin-top: 4px; line-height: 1.6; }
	.members { margin-top: 6px; color: #d9d6e8; }
	.delform { margin-top: 20px; }
	.delform input[type="submit"] { padding: 11px 20px; font-size: 14px; font-weight: 700;
		font-family: 'Space Grotesk', sans-serif; border-radius: 8px; cursor: pointer;
		background: none; border: 1px solid #ff6b6b; color: #ff6b6b; }
	.delform input[type="submit"]:hover { background: rgba(255,107,107,0.1); }
</style>
</head>
<body>
	<div class="wrap">
		<a class="back" href="/dashboard">&larr; back to dashboard</a>
		<div class="tag">// project details</div>
		<h1><c:out value="${project.title}" /></h1>

		<div class="panel">
			<div class="row">
				<div class="k">Project</div>
				<div class="v"><c:out value="${project.title}" /></div>
			</div>
			<div class="row">
				<div class="k">Description</div>
				<div class="v"><c:out value="${project.description}" /></div>
			</div>
			<div class="row">
				<div class="k">Due Date</div>
				<div class="v"><fmt:formatDate value="${project.dueDate}" pattern="d MMM yyyy" /></div>
			</div>
			<div class="row">
				<div class="k">Team Lead</div>
				<div class="v"><c:out value="${project.lead.firstName}" />
					<c:out value="${project.lead.lastName}" /></div>
			</div>
			<div class="row">
				<div class="k">Team Members</div>
				<div class="v members">
					<%-- Loop the project's team (@OneToMany): everyone
					     whose "project" foreign key points here --%>
					<c:forEach var="oneMember" items="${project.team}">
						<c:out value="${oneMember.firstName}" />
						<c:out value="${oneMember.lastName}" /><br>
					</c:forEach>
					<c:if test="${project.team.size() == 0}">
						No team members yet.
					</c:if>
				</div>
			</div>

			<%-- The delete button appears for the team lead only --%>
			<c:if test="${project.lead.id == userId}">
				<form class="delform" action="/projects/${project.id}" method="post">
					<input type="hidden" name="_method" value="delete" />
					<input type="submit" value="Delete Project" />
				</form>
			</c:if>
		</div>
	</div>
</body>
</html>
