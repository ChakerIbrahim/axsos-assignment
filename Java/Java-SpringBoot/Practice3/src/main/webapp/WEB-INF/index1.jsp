<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>AXSOS Academy Programs Page</title>
</head>
<body>
    <h1>AXSOS Academy Programs</h1>
    <c:forEach var="oneProgram" items="${programsFromMyController}">
        <p><c:out value="${oneProgram}"></c:out></p>
    </c:forEach>
    
    <c:forEach var="person" items="${people}">
    	<c:out value="${person.name}"/>
    </c:forEach>
    <c:forEach var="banana" items="${people}">
    	<c:out value="${banana.name}"/>
    </c:forEach>
    
    <c:if test = "${number==secretNumber}">
    	<p><c:out value="You got it!"/></p>
    </c:if>
    <c:if test = "${number!=secretnumber}">
    	<p><c:out value="Try again."/></p>
    </c:if>
    
    <c:if test = "${number<secretNumber}">
    	<p><c:out value="Your number is too low."/></p>
    </c:if>
    <c:if test = "${number>secretNumber}">
    	<p><c:out value="Your number is too high."/></p>
    
    
    <c:choose>
    	<c:when test="${number<secretNumber}">
    		<p><c:out value="Your number is too low."></c:out>
    	</c:when>
    	<c:when test="${number>secretnumber}">
    		<p><c:out value="Your number is too high"></c:out>
    	</c:when>
    	<c:otherwise>
    		<p><c:out value="You got it"></c:out>
    	</c:otherwise>
    </c:choose>
</body>
</html>