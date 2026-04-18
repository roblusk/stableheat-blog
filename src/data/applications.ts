export interface Application {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  longDescription: string;
}

export const applications: Application[] = [
  {
    slug: 'home',
    name: 'Home',
    icon: 'house',
    tagline: 'Residential radiant heat for the rooms you live in.',
    longDescription:
      'StableHeat for the home — under-tile warmth in baths and kitchens, whole-room comfort in living spaces, and quiet, ductless air across every floor.',
  },
  {
    slug: 'floor',
    name: 'Floor',
    icon: 'table-cells-large',
    tagline: 'Under-floor warmth for tile, hardwood, LVP, and more.',
    longDescription:
      'Self-regulating elements designed to live under whatever finish floor your project calls for, from porcelain to engineered wood to vinyl plank.',
  },
  {
    slug: 'commercial',
    name: 'Commercial',
    icon: 'building',
    tagline: 'Radiant heat for offices, hospitality, healthcare, and retail.',
    longDescription:
      'Zone-friendly radiant systems that reduce HVAC load, eliminate cold spots, and quietly improve tenant comfort across commercial buildings of every shape.',
  },
  {
    slug: 'rv',
    name: 'RV',
    icon: 'caravan',
    tagline: 'Self-regulating warmth for the road.',
    longDescription:
      'Low-voltage, moisture-safe radiant for fifth wheels, motorcoaches, and custom builds — quiet, efficient, and friendly to your battery bank.',
  },
  {
    slug: 'marine',
    name: 'Marine',
    icon: 'sailboat',
    tagline: 'Below-deck comfort engineered for the water.',
    longDescription:
      'Marine-grade radiant systems that warm soles, cabins, and crew quarters without the moisture, salt, and condensation issues of traditional forced-air heat.',
  },
  {
    slug: 'snowmelt',
    name: 'Snowmelt',
    icon: 'snowflake',
    tagline: 'Driveways, walks, and ramps that clear themselves.',
    longDescription:
      'Embedded heating elements that turn winter precipitation into a non-issue for residential driveways, ADA ramps, loading docks, and commercial entries.',
  },
  {
    slug: 'roof-de-ice',
    name: 'Roof De-Ice',
    icon: 'icicles',
    tagline: 'Stop ice dams before they start.',
    longDescription:
      'Self-regulating roof and gutter de-icing that prevents the ice-dam cycle that damages roofs, gutters, and the ceilings underneath them.',
  },
  {
    slug: 'solar',
    name: 'Solar',
    icon: 'solar-panel',
    tagline: 'Snow-clearing heat for solar panel arrays.',
    longDescription:
      'Self-regulating heat trace integrated with rooftop and ground-mount solar arrays — keeping panels clear of snow and ice through the months when generation matters most.',
  },
  {
    slug: 'oil-gas',
    name: 'Oil & Gas',
    icon: 'oil-well',
    tagline: 'Heat trace and process heating built for the field.',
    longDescription:
      'Industrial heat-trace and OEM heating elements engineered for tanks, lines, and process equipment in oil, gas, and heavy industrial applications.',
  },
];
