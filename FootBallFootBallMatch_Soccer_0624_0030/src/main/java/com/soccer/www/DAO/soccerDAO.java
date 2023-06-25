package com.soccer.www.DAO;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.soccer.www.DTO.BoardDTO;
import com.soccer.www.DTO.CommentDTO;
import com.soccer.www.DTO.MemberDTO;

public class soccerDAO {
	private static soccerDAO soccerDAO = new soccerDAO();
	private DataSource datasource;

	/*
	 * String driver = "com.mysql.cj.jdbc.Driver"; String url =*
	 * "jdbc:mysql://127.0.0.1:3306/project?serverTimezone=UTC"; String user =
	 * "root"; String pw = "1234";
	 */

	public soccerDAO() {
		try {
			Context context = new InitialContext();
			datasource = (DataSource) context.lookup("java:comp/env/jdbc/project");
		} catch (NamingException e) {
			e.printStackTrace();
		}

	}

	public static soccerDAO getsoccerDAO() {
		return soccerDAO;
	}

	public int checknickName(String tomNickName) {
		String sql = "SELECT * FROM member " + " WHERE nickName = '" + tomNickName + "'";
		System.out.println("tomNickName check dao : " + sql);
		int result = 1;
		try (Connection conn = datasource.getConnection();
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql)) {
			if (rs.next()) {
				result = -1;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

	public MemberDTO loginDAO(String email, String password) {
		String sql = "select * from member where email = " + "'" + email + "'" + " and password = " + "'" + password
				+ "'";
		MemberDTO dto = new MemberDTO();
		try (Connection conn = datasource.getConnection();
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql)) {
			if (rs.next()) {
				dto.setEmail(rs.getString("email"));
				dto.setPassword(rs.getString("password"));
				dto.setNickName(rs.getString("nickName"));
			} else {
				dto = null;
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return dto;
	}

	public int regMemberDAO(MemberDTO dto) {
		String sql = "insert into member values(?,?,?,?,?,?,?,?,?,?,?)";
		int result = 0;
		try (Connection conn = datasource.getConnection(); PreparedStatement psmt = conn.prepareStatement(sql)) {
			psmt.setString(1, dto.getEmail());
			psmt.setString(2, dto.getPassword());
			psmt.setString(3, dto.getName());
			psmt.setString(4, dto.getNickName());
			psmt.setString(5, dto.getGender());
			psmt.setString(6, dto.getPhoneNumber());
			psmt.setString(7, dto.getPostcode());
			psmt.setString(8, dto.getRoadAddress());
			psmt.setString(9, dto.getJibunAddress());
			psmt.setString(10, dto.getDetailAddress());
			psmt.setString(11, dto.getExtraAddress());
			result = psmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return result;
	}

// Below this line, About BoardDTO... 

	public ArrayList<BoardDTO> listDAO() {
		ArrayList<BoardDTO> list = new ArrayList<BoardDTO>();
//		String sql = "SELECT * FROM board order by writeDate";
		String sql = "select * from board inner join member on board.email = member.email order by boardNum";

		try (Connection conn = datasource.getConnection();
				PreparedStatement ps = conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery()) {
			while (rs.next()) {
				BoardDTO dto = new BoardDTO();
				dto.setEmail(rs.getString("email"));
				dto.setBoardPW(rs.getString("boardPW"));
				dto.setTitle(rs.getString("title"));
				dto.setDivision(rs.getString("division"));
				dto.setContents(rs.getString("contents"));
				dto.setBoardNum(rs.getInt("boardNum"));
				dto.setWriteDate(rs.getDate("writeDate"));
				dto.setNickName(rs.getString("nickName"));
				list.add(dto);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return list;
	}

	public BoardDTO getBoardDTO(int boardNum) {
		String sql = "select * from board inner join member on board.email = member.email where boardNum = " + boardNum;
//		String sql = "SELECT * FROM BOARD WHERE boardNum = " + boardNum;
		BoardDTO dto = new BoardDTO();
		try (Connection conn = datasource.getConnection();
				PreparedStatement ps = conn.prepareStatement(sql);
				ResultSet rs = ps.executeQuery()) {
			if(rs.next()) {
				dto.setEmail(rs.getString("email"));
				dto.setBoardPW(rs.getString("boardPW"));
				dto.setTitle(rs.getString("title"));
				dto.setDivision(rs.getString("division"));
				dto.setContents(rs.getString("contents"));
				dto.setBoardNum(rs.getInt("boardNum"));
				dto.setWriteDate(rs.getDate("writeDate"));
				dto.setNickName(rs.getString("nickName"));
			}
			int result = ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return dto;

	}

	public int writeOKDAO(BoardDTO dto) {
		String sql = "INSERT INTO board (email,boardPW,title,contents,division) values(?,?,?,?,?)";
		int result = 0;

		try (Connection conn = datasource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setString(1, dto.getEmail());
			ps.setString(2, dto.getBoardPW());
			ps.setString(3, dto.getTitle());
			ps.setString(4, dto.getContents());
			ps.setString(5, dto.getDivision());

			result = ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}

	public void deleteDAO(int boardNum) {
		String sql = "DELETE FROM board WHERE boardNum = ?";
		int result = 0;
		try (Connection conn = datasource.getConnection();
				PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setInt(1, boardNum);
			result = ps.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		}
	}

	public BoardDTO viewDAO(int boardNum) {
		BoardDTO dto = getBoardDTO(boardNum);
		return dto;
	}

	public ArrayList<CommentDTO> getCommentListByBoardNum(int boardNum) {
		String sql = "select * from comment where boardNum = " + boardNum;
		ArrayList<CommentDTO> commentList = new ArrayList<>();
		try (Connection conn = datasource.getConnection();
				Statement stmt = conn.createStatement();
				ResultSet rs = stmt.executeQuery(sql)) {
			while (rs.next()) {
				CommentDTO commentDTO = new CommentDTO();
				commentDTO.setCommentDate(rs.getDate("commentDate"));
				commentDTO.setCommentContents(rs.getString("commentContents"));
				commentDTO.setEmail(rs.getString("email"));
				commentDTO.setBoardNum(rs.getInt("boardNum"));
				commentList.add(commentDTO);
			}

		} catch (SQLException e) {
			e.printStackTrace();
		}
		return commentList;
	}

	public int insertComment(CommentDTO commentDTO) {
		String sql = "insert into comment (email,commentContents,boardNum) values (?,?,?)";
		int result = 0;
		try (Connection conn = datasource.getConnection(); PreparedStatement ps = conn.prepareStatement(sql)) {
			ps.setString(1, commentDTO.getEmail());
			ps.setString(2, commentDTO.getCommentContents());
			ps.setInt(3, commentDTO.getBoardNum());
			result = ps.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		return result;
	}
}
