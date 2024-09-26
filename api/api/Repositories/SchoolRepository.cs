using api.Data;
using api.Interfaces;
using api.Models;

namespace api.Repositories
{
    public class SchoolRepository : ISchoolRepository
    {
        private readonly AppDbContext _context;

        public SchoolRepository(AppDbContext context)
        {
            _context = context;
        }
        public School Create(School school)
        {
            _context.Schools.Add(school);
            _context.SaveChanges();
            return school;
        }

        public School Get(int schoolId)
        {
            var school = _context.Schools.Find(schoolId);
            if (school == null) return null!;
            return school;
        }

        public List<School> GetAll()
        {
            return _context.Schools.ToList();
        }

        public int Remove(int schoolId)
        {
            var school = _context.Schools.Find(schoolId);
            if (school == null) return 0;
            _context.Schools.Remove(school);
            _context.SaveChanges();
            return schoolId;
        }

        public School Update(int schoolId, School school)
        {
            var school_db = _context.Schools.Find(schoolId);

            if(school_db == null) return null!;

            school_db.Name = school.Name;
            school_db.City = school.City;
            school_db.Acronym = school.Acronym;

            _context.Update(school_db);
            _context.SaveChanges();
            return school_db;
        }
    }
}
