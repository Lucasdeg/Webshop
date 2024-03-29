using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Models;

using MailKit.Net.Smtp;
using MailKit;
using MimeKit;

namespace Controllers
{
    //This is the default route of the API. 
    [Route("api/[controller]")]
    public class UserController : Controller{
        private readonly normieContext _context;
        public UserController(normieContext context){
            this._context = context;
        }
        //public static List<user> users = new List<user>();  
        
        // GET api/values
        [HttpGet("Get")]
        public IActionResult Get(){
            return Ok(this._context.Klanten.ToArray());   
        }
        // GET api/values/5
        [HttpGet("Get/{id}")]
        public IActionResult Get(int id){
            var foundUser = this._context.Klanten.Where(user => user.KlantId  == id).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundUser);
            }
            else{
                return NotFound(foundUser);
            }
        }
        [HttpGet("Get/Username/{username}")]
        public IActionResult Get(string username){
            var foundUser = this._context.Klanten.Where(user => user.username == username).FirstOrDefault();
            if(foundUser != null){
                return Ok(foundUser);
            }
            else{
                return NotFound(foundUser);
            }
        }
        // POST api/values
        [HttpPost("Post")]
        public void Post([FromBody]Klant user){
            int possiblePK = 1;
            while(this._context.Klanten.Find(possiblePK) != null){
                possiblePK += 1;
            }
            user.KlantId = possiblePK;
            user.klantRegistratieDatum = DateTime.Now;
            this._context.Klanten.Add(user);
            this._context.SaveChanges();
            this.SendEmail(user);
           
        }
        [HttpPut]
        public void Put([FromBody] Klant user){
            var existingKlant = this._context.Klanten.Where((x) => x.KlantId ==  user.KlantId).FirstOrDefault();
            existingKlant.username = user.username;
            existingKlant.klantAchternaam = user.klantAchternaam;
            existingKlant.klantMail = user.klantMail;
            existingKlant.klantNaam = user.klantNaam;
            existingKlant.klantPostcode = user.klantPostcode;
            existingKlant.klantStraat = user.klantStraat;
            existingKlant.klantStraatnmr = user.klantStraatnmr;
            existingKlant.klantTel = user.klantTel;
            existingKlant.klantTussenvoegsel = user.klantTussenvoegsel;
            existingKlant.password = user.password;
            existingKlant.klantPlaats = user.klantPlaats;            
            this._context.SaveChanges();
        }
        public void SendEmail(Klant user){
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("normiewebshop@stefanpesic.nl"));
            message.To.Add(new MailboxAddress(user.klantMail));
            message.Subject = "Registratie Normiewebshop";
            message.Body = new TextPart("plain"){
                Text = String.Format(
                    "Welkom {0}, bij de Normiewebshop!\r" +
                    "\r" +
                    "Je logingegevens:\r" +
                    "Gebruikersnaam: {1}\r" +
                    "Wachtwoord: {2}\r" +
                    "\r" +
                    "Met vriendelijke groeten,\r" +
                    "Normiewebshop",user.klantNaam,user.username, user.password)
                };

            using (var client = new SmtpClient()){
                client.Connect("mail.stefanpesic.nl", 465, true);
                client.AuthenticationMechanisms.Remove("XOAUTH2");
                client.Authenticate("normiewebshop@stefanpesic.nl", "normieshopdude!");
                client.Send(message);
                client.Disconnect(true);             
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id){
            var klantRemove = this._context.Klanten.Find(id);
            this._context.Klanten.Remove(klantRemove);

            var reviewsToRemove = this._context.Review.Where((r) => r.KlantId == id);
            this._context.Review.RemoveRange(reviewsToRemove);
            
            this._context.SaveChanges();
      
        }
        //Updates gegevens information from users profile
        [HttpPut("profile")]
        public void PutGegevensUser([FromBody] dynamic user){
            int userPk = user.pk;
            var foundUser = this._context.Klanten.Where((a) => a.KlantId == userPk).FirstOrDefault();
            foundUser.klantMail = user.email;
            foundUser.klantStraat = user.straatNaam;
            foundUser.klantStraatnmr = user.straatNummer;
            foundUser.klantPostcode = user.postcode;
            foundUser.klantPlaats = user.plaats;
            this._context.SaveChanges();


        }
    }
}
