import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.Serial;

@WebServlet("/LoginServlet")
public class LoginServlet extends HttpServlet {
  @Serial
  private static final long serialVersionUID = 1L;

  protected void doPost(HttpServletRequest request, HttpServletResponse response)
    throws IOException {
    String username = request.getParameter("username");
    String password = request.getParameter("password");

    // Validate credentials (replace with your authentication logic)
    if ("user".equals(username) && "password".equals(password)) {
      HttpSession session = request.getSession();
      session.setAttribute("username", username);
      response.sendRedirect("usermain.html"); // Redirect to userLogin.html
    } else {
      response.sendRedirect("index.html?error=invalid");
    }
  }
}
