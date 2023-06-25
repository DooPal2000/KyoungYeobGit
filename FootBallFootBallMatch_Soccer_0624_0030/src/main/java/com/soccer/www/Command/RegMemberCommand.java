package com.soccer.www.Command;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.soccer.www.DAO.soccerDAO;
import com.soccer.www.DTO.MemberDTO;

public class RegMemberCommand implements Command {

	@Override
	public void excute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		MemberDTO dto = new MemberDTO();
		soccerDAO dao = soccerDAO.getsoccerDAO();

		String email = request.getParameter("email");
		String password = request.getParameter("password");
		String name = request.getParameter("name");
		String nickName = request.getParameter("nickName");
		String gender = request.getParameter("gender");
		String phoneNumber = request.getParameter("phoneNumber");
		String postcode = request.getParameter("postcode");
		String roadAddress = request.getParameter("roadAddress");
		String jibunAddress = request.getParameter("jibunAddress");
		String detailAddress = request.getParameter("detailAddress");
		String extraAddress = request.getParameter("extraAddress");

		System.out.println("ȸ������: " + email + " " + password + " " + name + " " + nickName);

		dto.setEmail(email);
		dto.setPassword(password);
		dto.setName(name);
		dto.setNickName(nickName);
		dto.setGender(gender);
		dto.setPhoneNumber(phoneNumber);
		dto.setPostcode(postcode);
		dto.setRoadAddress(roadAddress);
		dto.setJibunAddress(jibunAddress);
		dto.setDetailAddress(detailAddress);
		dto.setExtraAddress(extraAddress);

		int result = dao.regMemberDAO(dto);
		System.out.println("ȸ������ ����?" + result);

	}

}
