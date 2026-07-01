<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Omikuji</title>
</head>
<body>
	<h1>Send an Omikuji!</h1>
	
	<form action="/omikuji" method="post">
		<label for ="number">Pick any number from 5 to 25</label>
		<input type="number" name="number" min="5" max="25" value="10" required>
		
		<label for="city">Enter the name of any city</label>
		<input type="text" name="city" placeholder="Nairobi" required>
		
		<label for="person">Enter the name of any real person:</label>
		<input type="text" name="person" placeholder="Bob Shelton" required>
		
		<label for="hobby">Enter professional endeavor or hobby</label>
		<input type="text" name="hobby" placeholder="selling origami" required>
		
		<label for ="livingThing">Enter any type of living thing:</label>
		<input type="text" name="livingThing" placeholder="ferret" required>
		
		<label for="message">Say something nice to someone:</label>
		<textarea name="message" rows="3" placeholder="You do not realize how happy you make others." required></textarea>
		
		<p>Send and show a friend</p>
		<button type="submit">Send </button>
	</form>
	
</body>
</html>