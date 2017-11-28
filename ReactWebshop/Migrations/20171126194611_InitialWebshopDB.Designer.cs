﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.EntityFrameworkCore.Storage.Internal;
using Models;
using System;

namespace reactTwo.Migrations
{
    [DbContext(typeof(normieContext))]
    [Migration("20171126194611_InitialWebshopDB")]
    partial class InitialWebshopDB
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.0.1-rtm-125");

            modelBuilder.Entity("Models.Admin", b =>
                {
                    b.Property<int>("AdminId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("achterNaam");

                    b.Property<string>("functie");

                    b.Property<string>("mail");

                    b.Property<string>("tussenVoegsel");

                    b.Property<string>("voorNaam");

                    b.HasKey("AdminId");

                    b.ToTable("Admins");
                });

            modelBuilder.Entity("Models.Bestelling", b =>
                {
                    b.Property<int>("BestellingId")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTime>("bestellingDatum");

                    b.Property<int>("klantId");

                    b.Property<int>("productId");

                    b.Property<string>("status");

                    b.Property<DateTime>("verstuurDatum");

                    b.HasKey("BestellingId");

                    b.ToTable("Bestellingen");
                });

            modelBuilder.Entity("Models.Betaling", b =>
                {
                    b.Property<int>("BetalingId")
                        .ValueGeneratedOnAdd();

                    b.Property<decimal>("bedrag");

                    b.Property<DateTime>("betalingsDatum");

                    b.HasKey("BetalingId");

                    b.ToTable("Betalingen");
                });

            modelBuilder.Entity("Models.Klant", b =>
                {
                    b.Property<int>("KlantId")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("klantAchternaam");

                    b.Property<string>("klantMail");

                    b.Property<string>("klantNaam");

                    b.Property<string>("klantPostcode");

                    b.Property<string>("klantStraat");

                    b.Property<string>("klantStraatnmr");

                    b.Property<int>("klantTel");

                    b.Property<string>("klantTussenvoegsel");

                    b.Property<string>("password");

                    b.Property<string>("username");

                    b.HasKey("KlantId");

                    b.ToTable("Klanten");
                });

            modelBuilder.Entity("Models.Product", b =>
                {
                    b.Property<int>("ProductId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("aantalInVooraad");

                    b.Property<string>("consoleType");

                    b.Property<string>("productGenre");

                    b.Property<string>("productImg");

                    b.Property<string>("productNaam");

                    b.Property<string>("productOmschr");

                    b.Property<string>("productOntwikkelaar");

                    b.Property<decimal>("productPrijs");

                    b.Property<string>("productType");

                    b.Property<string>("productUitgever");

                    b.HasKey("ProductId");

                    b.ToTable("Producten");
                });

            modelBuilder.Entity("Models.Wenslijst", b =>
                {
                    b.Property<int>("WenslijstId")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("KlantId");

                    b.Property<int>("productNmr");

                    b.Property<DateTime>("toevoegDatum");

                    b.HasKey("WenslijstId");

                    b.ToTable("Wenslijsten");
                });
#pragma warning restore 612, 618
        }
    }
}