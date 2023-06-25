package com.soccer.www.Command;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.soccer.www.DAO.soccerDAO;
import com.soccer.www.DTO.BoardDTO;
import com.soccer.www.DTO.CommentDTO;

public class ViewCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		int boardNum = Integer.parseInt(request.getParameter("boardNum"));
		soccerDAO dao = soccerDAO.getsoccerDAO();
		BoardDTO dto = dao.viewDAO(boardNum);
		ArrayList<CommentDTO> commentList = dao.getCommentListByBoardNum(boardNum);
		
		request.setAttribute("boardDTO", dto);
		request.setAttribute("commentList", commentList);
	}
}
