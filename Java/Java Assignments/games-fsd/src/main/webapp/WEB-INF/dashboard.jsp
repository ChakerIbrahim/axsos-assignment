<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%-- fmt: JSTL's formatting tags - used to print dates as "27 sep 2023" --%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>User Dashboard</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
<style>
	* { margin: 0; padding: 0; box-sizing: border-box; }
	body {
		font-family: 'Space Grotesk', sans-serif;
		background: radial-gradient(ellipse at top, #1c1a2e 0%, #0f0e17 55%);
		color: #eae8f0; min-height: 100vh; padding: 50px 6vw 80px;
	}
	.tag {
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #ffb454; letter-spacing: 2px; text-transform: uppercase;
	}
	.topbar {
		display: flex; justify-content: space-between; align-items: center;
		flex-wrap: wrap; gap: 20px; margin-bottom: 40px;
	}
	.who { display: flex; align-items: center; gap: 14px; }
	.who img {
		width: 52px; height: 52px; border-radius: 50%;
		object-fit: cover; border: 2px solid #ffb454;
	}
	h1 { font-size: 32px; }
	h1 a { color: #ffb454; text-decoration: none; }
	h1 a:hover { text-decoration: underline; }
	.logout {
		color: #8f8ba3; border: 1px solid #2c2a3e; border-radius: 8px;
		padding: 10px 16px; font-size: 14px; font-weight: 700; text-decoration: none;
	}
	.logout:hover { color: #eae8f0; border-color: #8f8ba3; }
	.layout { display: flex; flex-wrap: wrap; gap: 26px; align-items: flex-start; }
	.panel {
		width: 340px; background: rgba(255,255,255,0.03);
		border: 1px solid #2c2a3e; border-radius: 14px; padding: 24px 22px 28px;
		box-shadow: 0 0 40px rgba(255,180,84,0.07);
	}
	.panel h2 { font-size: 20px; margin: 4px 0 14px; }
	label {
		display: block; font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase; margin: 14px 0 6px;
	}
	input[type="text"], input[type="date"], textarea, select {
		width: 100%; padding: 11px 13px; font-size: 15px;
		font-family: 'Space Grotesk', sans-serif; color: #eae8f0;
		background: #16141f; border: 1px solid #2c2a3e; border-radius: 8px; outline: none;
	}
	textarea { min-height: 90px; resize: vertical; }
	input:focus, textarea:focus, select:focus { border-color: #ffb454; }
	.error { display: block; color: #ff6b6b; font-size: 13px; margin-top: 5px; }
	input[type="submit"] {
		width: 100%; margin-top: 20px; padding: 13px; font-size: 15px; font-weight: 700;
		font-family: 'Space Grotesk', sans-serif; color: #0f0e17;
		background: #ffb454; border: none; border-radius: 8px; cursor: pointer;
	}
	input[type="submit"]:hover { filter: brightness(1.1); }
	.tablewrap { flex: 1; min-width: 500px; }
	table {
		width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03);
		border: 1px solid #2c2a3e; border-radius: 14px; overflow: hidden;
	}
	th, td { text-align: left; padding: 13px 16px; font-size: 15px; }
	th {
		font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
		letter-spacing: 2px; text-transform: uppercase; color: #5eead4;
		border-bottom: 1px solid #2c2a3e;
	}
	th a { color: #5eead4; text-decoration: none; }
	th a:hover { text-decoration: underline; }
	tbody tr { border-bottom: 1px solid #1d1b2b; }
	tbody tr:hover { background: rgba(255,180,84,0.05); }
	td a { color: #ffb454; font-weight: 500; text-decoration: none; }
	td a:hover { text-decoration: underline; }
</style>
</head>
<body>

	<div class="topbar">
		<div class="who">
			<%-- The avatar picture stored at registration --%>
			<img src="${user.avatar}" alt="avatar">
			<div>
				<div class="tag">// user dashboard</div>
				<%-- The name links to the profile page (Player Info) --%>
				<h1>Welcome <a href="/profile/${user.id}">
					<c:out value="${user.firstName}" /> <c:out value="${user.lastName}" /></a></h1>
			</div>
		</div>
		<a class="logout" href="/logout">Logout</a>
	</div>

	<div class="layout">

		<%-- ============ Create a Game form ============
		     Bound to the empty "game" object the controller passed --%>
		<div class="panel">
			<div class="tag">// new game</div>
			<h2>Create a Game</h2>
			<form:form action="/games" method="post" modelAttribute="game">
				<form:label path="title">Game name</form:label>
				<form:input path="title" />
				<form:errors path="title" cssClass="error" />

				<%-- Drop-down menu for the genre --%>
				<form:label path="genre">Genre</form:label>
				<form:select path="genre">
					<form:option value="" label="-- select --" />
					<form:option value="Action">Action</form:option>
					<form:option value="Strategy">Strategy</form:option>
					<form:option value="RPG">RPG</form:option>
					<form:option value="Arcade">Arcade</form:option>
					<form:option value="Adventure">Adventure</form:option>
					<form:option value="Tactical shooter">Tactical shooter</form:option>
				</form:select>
				<form:errors path="genre" cssClass="error" />

				<%-- Date picker: release date should not be in the future --%>
				<form:label path="releaseDate">Release Date</form:label>
				<form:input path="releaseDate" type="date" />
				<form:errors path="releaseDate" cssClass="error" />

				<form:label path="description">Description</form:label>
				<form:textarea path="description" />
				<form:errors path="description" cssClass="error" />

				<input type="submit" value="Create a Game" />
			</form:form>
		</div>

		<%-- ============ The games table ============
		     Column headers are links: ?sort=... re-runs the page
		     with the matching ORDER BY derived query --%>
		<div class="tablewrap">
			<table>
				<thead>
					<tr>
						<th><a href="/dashboard?sort=title">Game &#8645;</a></th>
						<th><a href="/dashboard?sort=genre">Genre &#8645;</a></th>
						<th><a href="/dashboard?sort=date">Release Date &#8645;</a></th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="oneGame" items="${games}">
						<tr>
							<td>
								<%-- Game name links to the Game Info page --%>
								<a href="/game/${oneGame.id}">
									<c:out value="${oneGame.title}" />
								</a>
							</td>
							<td><c:out value="${oneGame.genre}" /></td>
							<td>
								<%-- Date formatting: day in number, month in
								     words, year in number -> "27 sep 2023" --%>
								<fmt:formatDate value="${oneGame.releaseDate}" pattern="d MMM yyyy" />
							</td>
						</tr>
					</c:forEach>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>
