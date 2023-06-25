package com.soccer.www.Command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.soccer.www.DAO.soccerDAO;
import com.soccer.www.DTO.MemberDTO;

public class LoginCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		soccerDAO dao = soccerDAO.getsoccerDAO();
		String email = request.getParameter("email");
		String password = request.getParameter("password");

		System.out.println("로그인 이메일과 비번 " + email + " " + password + " "); // 占쏙옙占쏙옙占�?

		HttpSession session = request.getSession();
		MemberDTO dto = dao.loginDAO(email, password);
		if(dto != null) {
			session.setAttribute("dto", dto);
			System.out.println("login 성공");
		} else {

			request.setAttribute("error", "아이디 혹은 비밀번호가 일치하지 않습니다...");
			request.getRequestDispatcher("error.jsp").forward(request, response); // error.jsp로 이동

		}
		
		
		 }
	}
