<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Profile</title>
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
		flex-wrap: wrap; gap: 20px; margin-bottom: 34px;
	}
	h1 { font-size: 26px; margin-top: 4px; }
	.nav a { color: #8f8ba3; text-decoration: none; margin-left: 16px;
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		letter-spacing: 1px; text-transform: uppercase; }
	.nav a:hover { color: #5eead4; }
	.layout { display: flex; flex-wrap: wrap; gap: 26px; align-items: flex-start; }
	.panel {
		width: 380px; background: rgba(255,255,255,0.03);
		border: 1px solid #2c2a3e; border-radius: 14px; padding: 26px 24px;
		box-shadow: 0 0 40px rgba(255,180,84,0.07);
		text-align: center;
	}
	.panel img {
		width: 96px; height: 96px; border-radius: 50%;
		object-fit: cover; border: 3px solid #ffb454; margin-bottom: 14px;
	}
	.panel h2 { font-size: 24px; }
	.panel .info { color: #8f8ba3; margin-top: 8px; line-height: 1.7; font-size: 15px; }
	.side { flex: 1; min-width: 380px; }
	.side h2 { font-size: 17px; margin-bottom: 12px; color: #8f8ba3; }
	table {
		width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03);
		border: 1px solid #2c2a3e; border-radius: 14px; overflow: hidden;
	}
	th, td { text-align: left; padding: 12px 16px; font-size: 15px; }
	th {
		font-family: 'JetBrains Mono', monospace; font-size: 11px; font-weight: 700;
		letter-spacing: 2px; text-transform: uppercase; color: #5eead4;
		border-bottom: 1px solid #2c2a3e;
	}
	tbody tr { border-bottom: 1px solid #1d1b2b; }
	td a { color: #ffb454; text-decoration: none; }
	td a:hover { text-decoration: underline; }
	.empty { color: #8f8ba3; font-size: 14px; padding: 14px 16px; }
</style>
</head>
<body>

	<div class="topbar">
		<div>
			<div class="tag">// profile page</div>
			<%-- The logged-in user's greeting --%>
			<h1>Welcome <c:out value="${user.firstName}" /></h1>
		</div>
		<div class="nav">
			<a href="/dashboard">&larr; dashboard</a>
			<a href="/logout">logout</a>
		</div>
	</div>

	<div class="layout">

		<%-- ============ Player Info ============
		     "player" is the profile being viewed (may be someone else) --%>
		<div class="panel">
			<img src="${player.avatar}" alt="avatar">
			<h2><c:out value="${player.firstName}" /> <c:out value="${player.lastName}" /></h2>
			<div class="info">
				Email: <c:out value="${player.email}" /><br>
				DOB: <c:out value="${player.dateOfBirth}" />
			</div>
		</div>

		<%-- ============ Favourite Games ============
		     Loop the player's favorites (@OneToMany): each Favorite row
		     leads to its game with dot notation (oneFav.game) --%>
		<div class="side">
			<h2>Favourite Games</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Game</th>
						<th>Rate</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="oneFav" items="${player.favorites}">
						<tr>
							<td><c:out value="${oneFav.game.id}" /></td>
							<td>
								<%-- Each game links to its Game Info page --%>
								<a href="/game/${oneFav.game.id}">
									<c:out value="${oneFav.game.title}" />
								</a>
							</td>
							<td><c:out value="${oneFav.rate}" /></td>
						</tr>
					</c:forEach>
					<c:if test="${player.favorites.size() == 0}">
						<tr><td class="empty" colspan="3">No favourite games yet.</td></tr>
					</c:if>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>
