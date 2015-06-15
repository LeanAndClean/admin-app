namespace AdminWebApp.Controllers
{
    using Microsoft.AspNet.Mvc;

    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult HealthCheck()
        {
            return Json(new { Message = "OK" });
        }

        public IActionResult Error()
        {
            return View("~/Views/Shared/Error.cshtml");
        }
    }
}
