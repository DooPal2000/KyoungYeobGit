package com.soccer.www.Command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.soccer.www.DAO.soccerDAO;
import com.soccer.www.DTO.CommentDTO;
import com.soccer.www.DTO.MemberDTO;

public class CommentOKCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		soccerDAO dao = soccerDAO.getsoccerDAO();

		HttpSession session = request.getSession();
		MemberDTO memberDTO = (MemberDTO) session.getAttribute("dto");
		String email = memberDTO.getEmail();

		String commentContents = request.getParameter("commentContents");
		int boardNum = Integer.parseInt(request.getParameter("boardNum"));

		CommentDTO commentDTO = new CommentDTO();
		commentDTO.setEmail(email);
		commentDTO.setBoardNum(boardNum);
		commentDTO.setCommentContents(commentContents);

		dao.insertComment(commentDTO);
	}
}
