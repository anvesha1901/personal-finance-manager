import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.Serial;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/RegisterServlet")
public class RegisterServlet extends HttpServlet {
  @Serial
  private static final long serialVersionUID = 1L;

  private final List<String> registeredUsers = new ArrayList<>();

  protected void doPost(HttpServletRequest request, HttpServletResponse response) {
    String newUsername = request.getParameter("newUsername");
    String newPassword = request.getParameter("newPassword");

    // Check if the username is already registered
    if (registeredUsers.contains(newUsername)) {
      response.setStatus(HttpServletResponse.SC_CONFLICT);
    } else {
      registeredUsers.add(newUsername);
      response.setStatus(HttpServletResponse.SC_OK);
    }
  }
}
