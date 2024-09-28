﻿using api.Models;
using System.Text.Json.Serialization;

namespace api.Dtos
{
    public class RideDto
    {
        public int TournamentId { get; set; }
        public int PlayerId { get; set; }
        public int GokartId { get; set; }
        public string? Time { get; set; }
        public int RideNumber { get; set; }
    }
}