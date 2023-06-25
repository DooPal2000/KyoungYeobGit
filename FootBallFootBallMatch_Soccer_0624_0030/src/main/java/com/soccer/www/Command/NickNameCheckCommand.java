package com.soccer.www.Command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.soccer.www.DAO.soccerDAO;

public class NickNameCheckCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		soccerDAO dao = soccerDAO.getsoccerDAO();
		int result = dao.checknickName(request.getParameter("tomNickName"));
		System.out.println("tomNickName check result : " + result);
		request.setAttribute("result", result);
	}
}
