<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Game Info</title>
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
	.who { display: flex; align-items: center; gap: 14px; }
	.who img {
		width: 46px; height: 46px; border-radius: 50%;
		object-fit: cover; border: 2px solid #ffb454;
	}
	h1 { font-size: 26px; }
	.nav a { color: #8f8ba3; text-decoration: none; margin-left: 16px;
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		letter-spacing: 1px; text-transform: uppercase; }
	.nav a:hover { color: #5eead4; }
	.layout { display: flex; flex-wrap: wrap; gap: 26px; align-items: flex-start; }
	.panel {
		flex: 1; min-width: 380px; background: rgba(255,255,255,0.03);
		border: 1px solid #2c2a3e; border-radius: 14px; padding: 26px 24px;
	}
	.row { margin-bottom: 14px; }
	.row .k {
		font-family: 'JetBrains Mono', monospace; font-size: 12px;
		color: #8f8ba3; letter-spacing: 1px; text-transform: uppercase;
	}
	.row .v { margin-top: 4px; line-height: 1.6; }
	.row .v em { color: #ffb454; font-style: normal; font-size: 22px; font-weight: 700; }
	.creator a { color: #5eead4; text-decoration: none; }
	.creator a:hover { text-decoration: underline; }
	.controls { display: flex; gap: 14px; margin-top: 18px; }
	.btn {
		padding: 10px 18px; font-size: 14px; font-weight: 700; border-radius: 8px;
		text-decoration: none; border: none; cursor: pointer;
		font-family: 'Space Grotesk', sans-serif;
	}
	.edit { background: #5eead4; color: #0f0e17; }
	.delete { background: none; border: 1px solid #ff6b6b; color: #ff6b6b; }
	.delete:hover { background: rgba(255,107,107,0.1); }
	.favrow { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
	.fav { background: #ffb454; color: #0f0e17; }
	select {
		padding: 10px 12px; font-size: 15px; color: #eae8f0; background: #16141f;
		border: 1px solid #2c2a3e; border-radius: 8px; outline: none;
		font-family: 'Space Grotesk', sans-serif;
	}
	.side { width: 380px; }
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
		<div class="who">
			<img src="${user.avatar}" alt="avatar">
			<div>
				<div class="tag">// game info</div>
				<h1>Welcome <c:out value="${user.firstName}" /> <c:out value="${user.lastName}" /></h1>
			</div>
		</div>
		<div class="nav">
			<a href="/dashboard">&larr; dashboard</a>
			<a href="/logout">logout</a>
		</div>
	</div>

	<div class="layout">

		<%-- ============ The game's information ============ --%>
		<div class="panel">
			<div class="row">
				<div class="k">Game name :</div>
				<div class="v"><em><c:out value="${game.title}" /></em></div>
			</div>
			<div class="row">
				<div class="k">Genre :</div>
				<div class="v"><c:out value="${game.genre}" /></div>
			</div>
			<div class="row">
				<div class="k">Release date :</div>
				<div class="v"><fmt:formatDate value="${game.releaseDate}" pattern="d MMM yyyy" /></div>
			</div>
			<div class="row">
				<div class="k">Description :</div>
				<div class="v"><c:out value="${game.description}" /></div>
			</div>
			<div class="row creator">
				<div class="k">created By</div>
				<%-- The creator's name links to their profile page --%>
				<div class="v"><a href="/profile/${game.creator.id}">
					<c:out value="${game.creator.firstName}" /> <c:out value="${game.creator.lastName}" /></a></div>
			</div>

			<%-- Edit and Delete buttons appear for the CREATOR
			     of the game only (c:if compares the ids) --%>
			<c:if test="${game.creator.id == userId}">
				<div class="controls">
					<a class="btn edit" href="/edit/game/${game.id}">Edit</a>
					<%-- Delete: a small form sending DELETE via _method --%>
					<form action="/games/${game.id}" method="post">
						<input type="hidden" name="_method" value="delete" />
						<input class="btn delete" type="submit" value="Delete" />
					</form>
				</div>
			</c:if>

			<%-- "Add To Fav" + the Rate dropdown: a plain form whose
			     select is named "rate" -> read with @RequestParam --%>
			<form class="favrow" action="/game/${game.id}/favorite" method="post">
				<select name="rate">
					<option value="1">Rate 1</option>
					<option value="2">Rate 2</option>
					<option value="3">Rate 3</option>
					<option value="4">Rate 4</option>
					<option value="5">Rate 5</option>
				</select>
				<input class="btn fav" type="submit" value="Add To Fav" />
			</form>
		</div>

		<%-- ============ The players who like this game ============
		     We loop the game's favorites (@OneToMany): each row gives
		     us the player (favorite.user) and the rate they gave --%>
		<div class="side">
			<h2>The players who like this game the most</h2>
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Player name</th>
						<th>Rate</th>
					</tr>
				</thead>
				<tbody>
					<c:forEach var="oneFav" items="${game.favorites}">
						<tr>
							<td><c:out value="${oneFav.user.id}" /></td>
							<td>
								<%-- The player's name links to their profile --%>
								<a href="/profile/${oneFav.user.id}">
									<c:out value="${oneFav.user.firstName}" />
									<c:out value="${oneFav.user.lastName}" />
								</a>
							</td>
							<td><c:out value="${oneFav.rate}" /></td>
						</tr>
					</c:forEach>
					<c:if test="${game.favorites.size() == 0}">
						<tr><td class="empty" colspan="3">No players like this game yet.</td></tr>
					</c:if>
				</tbody>
			</table>
		</div>
	</div>
</body>
</html>
