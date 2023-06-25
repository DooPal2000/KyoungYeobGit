package com.soccer.www.Command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.soccer.www.DAO.soccerDAO;
import com.soccer.www.DTO.BoardDTO;
import com.soccer.www.DTO.MemberDTO;

public class WriteOKCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		soccerDAO dao = soccerDAO.getsoccerDAO();
		BoardDTO dto = new BoardDTO();

		HttpSession session = request.getSession();
		MemberDTO memberDTO=  (MemberDTO) session.getAttribute("dto");
		
		String email = memberDTO.getEmail();
		String boardPW = request.getParameter("boardPW");
		String title = request.getParameter("title");
		String division = request.getParameter("division");
		String contents = request.getParameter("contents");
		
		
		dto.setEmail(email);
		dto.setBoardPW(boardPW);
		dto.setTitle(title);
		dto.setDivision(division);
		dto.setContents(contents);
		
		dao.writeOKDAO(dto);
	}
}
