package com.soccer.www.Command;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.soccer.www.DAO.soccerDAO;
import com.soccer.www.DTO.BoardDTO;

public class ListCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		soccerDAO dao = soccerDAO.getsoccerDAO();
		ArrayList<BoardDTO> list = dao.listDAO();
		request.setAttribute("list", list);	
	}
}
