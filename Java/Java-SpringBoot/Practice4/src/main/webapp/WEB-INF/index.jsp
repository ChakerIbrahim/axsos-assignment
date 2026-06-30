<!-- Here we have to import the Date class. -->
<!-- You will put the import in the first line of the jsp tag. Use the import attribute -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" import="java.util.Date"%>
    <%@ taglib prefix = "c" uri = "http://java.sun.com/jsp/jstl/core"%>
    
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>Demo JSP</title>
    </head>
<body>
    <!-- Inserting a for loop into your jsp -->
   <h3>Login</h3>
   <form action='/login' method='post'>
   <label>Email:</label>
   		<input type="text" name='email'>
   	<label>Password:</label>
   		<input type='text' name='password'>
   		<input type='submit' value='login'>
   </form>
     <form action='/search' method='GET'>
   <label>Search:</label>
   		<input type="text" name='searchTerm'>
   		<input type='submit' value='login'>
   </form>
   
   <h3>Pay</h3>
   <form action="/processpayment" method="post>
   		<input type="hidden" name="productID" value="128">
   		<label>Credit Card Number</label>
   		<input type="text" name="creditNumber">
   		<label>Expiration Date</label>
   		<input type="date" name="expDate">
   		<input type="submit">
   	</form>
</body>
</html>