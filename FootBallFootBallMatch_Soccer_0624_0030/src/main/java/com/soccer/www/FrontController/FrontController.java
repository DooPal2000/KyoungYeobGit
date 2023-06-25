package com.soccer.www.FrontController;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.soccer.www.Command.Command;
import com.soccer.www.Command.CommentOKCommand;
import com.soccer.www.Command.DeleteCommand;
import com.soccer.www.Command.DeleteCommentCommand;
import com.soccer.www.Command.ListCommand;
import com.soccer.www.Command.LoginCommand;
import com.soccer.www.Command.LogoutCommand;
import com.soccer.www.Command.ModifyOKCommand;
import com.soccer.www.Command.NickNameCheckCommand;
import com.soccer.www.Command.RegMemberCommand;
import com.soccer.www.Command.ViewCommand;
import com.soccer.www.Command.WriteOKCommand;

@WebServlet("*.do")
public class FrontController extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    public FrontController() {
        super();
    }

	@Override
	protected void service(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		request.setCharacterEncoding("utf-8");
		String commandName = request.getServletPath();
		String viewPage = null;
		Command command = null;
		boolean flag = true;
		PrintWriter out = null;

		
		if(commandName.equals("/login.do")) {
			command = new LoginCommand();
			command.excute(request, response);
			viewPage = "index.jsp";
		} else if (commandName.equals("/logout.do")) {
			command = new LogoutCommand();
			command.excute(request, response);
			viewPage = "index.jsp";
		} else if (commandName.equals("/regMember.do")) {
			command = new RegMemberCommand();
			command.excute(request, response);
			viewPage = "index.jsp";
		} else if (commandName.equals("/nickNameCheck.do")) {
			command = new NickNameCheckCommand();
			command.excute(request, response);
			flag = false;
			viewPage = "index.jsp";

			String result_msg = request.getAttribute("result") + "";
			System.out.println(result_msg + " 훈 요청");

			out = response.getWriter();
			out.write(result_msg);
			return;

//			KKH 추가 시작 - 23.06.19
//			RequestDispatcher dispatcher = request.getRequestDispatcher(viewPage);
//			dispatcher.forward(request, response);

//			KKH 추가 끝 - 23.06.19

		} else if (commandName.equals("/list.do")) {
			command = new ListCommand();
			command.excute(request,response);
			viewPage = "boardList.jsp";	
			flag = false;
		}else if(commandName.equals("/write.do")) {
			viewPage = "boardWrite.jsp";
		}else if(commandName.equals("/writeOK.do")) {
			command = new WriteOKCommand();
			command.excute(request, response);
			viewPage = "list.do";			
		}else if(commandName.equals("/view.do")) {
			command = new ViewCommand();
			command.excute(request, response);
			flag = false;
			viewPage = "boardView.jsp";
		}else if(commandName.equals("/modifyOK.do")) {
			command = new ModifyOKCommand();
			command.excute(request, response);
			viewPage = "list.do";			
		}else if(commandName.equals("/commentOK.do")) {
			command = new CommentOKCommand();
			command.excute(request, response);
			flag = false;
			viewPage = "list.do";
		} else if (commandName.equals("/deleteComment.do")) {
			command = new DeleteCommentCommand();
			command.excute(request, response);
			viewPage = "list.do";
		} else if (commandName.equals("/delete.do")) {
			command = new DeleteCommand();
			command.excute(request, response);
			viewPage = "list.do";
		}
		

		if (flag) {
			response.sendRedirect(viewPage);
		} else {
			RequestDispatcher dispatcher = request.getRequestDispatcher(viewPage);
			if (dispatcher == null) {
				viewPage = "index.jsp";
				response.sendRedirect(viewPage);
			} else {
				dispatcher.forward(request, response);
			}
		}
//		response.getWriter().append("Served at: ").append(request.getContextPath());
	}
}
