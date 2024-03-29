using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

namespace reactTwo.Controllers
{
    [Route("api/[controller]")]
    public class SearchController : Controller
    {
        private readonly normieContext _context;

        public SearchController (normieContext context) {
            _context = context;
        }

        private int getAverageReview (int id) {
            var averageReview = _context.Review.Where((product => product.ProductId == id))
            .Select((product => product.Rating));
            if(averageReview.Count() <= 0){
                return 0;
            }
            else{
                 var converted = averageReview.Sum() / averageReview.Count();
                 return converted;
            }
        }

        private Product[] rightItems ( Func<Product, bool> pred) {
            List<Product> rightProducts = new List<Product>();

            IEnumerable<Product> productList = _context.Producten.AsEnumerable();

            foreach(Product product in productList){
                if ( pred(product) ) {
                    rightProducts.Add(product);
                }
            };

            return rightProducts.ToArray();
        }

        [HttpGet("[action]/{searchTerm}")]
        public Product[] SearchFor(string searchTerm)
        {
            return this.rightItems( p => 
                p.productNaam.Contains(searchTerm)          || 

                p.productType.Contains(searchTerm)          ||

                p.productGenre.Contains(searchTerm)         ||

                p.productOntwikkelaar.Contains(searchTerm)  ||

                p.productUitgever.Contains(searchTerm)      ||

                p.consoleType.Contains(searchTerm)          ||

                p.consoleType.Contains(searchTerm.Trim())
            );
        }
    }
}
