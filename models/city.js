class City {
  constructor(
    id,
    name,
    desc,
    imageUrl,
    population,
    area,
    affordability,
    photos,
    video,
    latitude,
    longitude,
    descSr,
    affordabilitySr,
    nameSr
  ) {
    (this.id = id),
      (this.name = name),
      (this.desc = desc),
      (this.imageUrl = imageUrl),
      (this.population = population),
      (this.area = area),
      (this.affordability = affordability),
      (this.photos = photos),
      (this.video = video),
      (this.latitude = latitude),
      (this.longitude = longitude),
      (this.descSr = descSr),
      (this.affordabilitySr = affordabilitySr),
      (this.nameSr = nameSr);
  }
}

export default City;
