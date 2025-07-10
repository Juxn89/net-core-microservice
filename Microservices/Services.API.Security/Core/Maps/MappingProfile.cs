using AutoMapper;
using Services.API.Security.Core.Entities;
using Services.API.Security.Core.Record;

namespace Services.API.Security.Core.Maps
{
  public class MappingProfile : Profile
  {
    public MappingProfile()
    {
      CreateMap<User, UserRecord>();
    }
  }
}
