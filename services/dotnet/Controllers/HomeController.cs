using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using sampleapp.Models;

namespace sampleapp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
			
			var myEnvironmentValue1 = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
			var myEnvironmentValue2 = Environment.GetEnvironmentVariable("SKYWALKING__SERVICENAME");
			var myEnvironmentValue3 = Environment.GetEnvironmentVariable("ASPNETCORE_HOSTINGSTARTUPASSEMBLIES");
            Console.WriteLine(myEnvironmentValue1);
            Console.WriteLine(myEnvironmentValue2);
            Console.WriteLine(myEnvironmentValue3);
			
		    return Content("asdfasdf"+myEnvironmentValue1+myEnvironmentValue2+myEnvironmentValue3); 

　　　
            //return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
