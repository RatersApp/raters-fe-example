import { ADMIN_APP_ROUTE } from '../api/routes';

export const APP_STORE_APP_LINK =
  'https://apps.apple.com/us/app/raters-movie-lovers-network/id1258540735';
export const PLAY_STORE_APP_LINK =
  'https://play.google.com/store/apps/details?id=com.raters.app';
export const HEDGEHOPPER_FALLBACK = ADMIN_APP_ROUTE + '/hedgehopper_image.png';
export const site = 'https://' + process.env.NEXT_PUBLIC_DOMAIN;

export const likeI18NextKeys = [
  null,
  'Feed.LikedByLess',
  'Feed.LikedByTwo',
  'Feed.LikedByThree',
];
export const ratedQuantityCases = [
  'NewExplore.NoFriendsRated',
  'Explore.OneFriendRated',
];

export const DAY_MONTH_YEAR = 'DD MMM YYYY';
export const MONTH_YEAR = 'MMM YYYY';
export const YEAR = 'YYYY';

export const EMPTY_STRING_PLACEHOLDER = '—';
export const NOT_AVAILABLE = 'N/A';
export const ROTTEN_TOMATOES = 'Rotten Tomatoes';

export const commentaryPageRoutes = {
  rating: 'reviews',
  watch: 'watchlist',
};

export const commentaryPageParams = {
  reviews: 'rating',
  watchlist: 'watch',
};

export const FEED_META_TITLE =
  'Movies your friends have reviewed or are planning to see - Raters';
export const FEED_META_DESCRIPTION =
  'Your Personalized Feed shows what your friends have been or want to watch. Follow your fellow movie lovers and like and comment on their posts';
export const LOGIN_META_TITLE =
  'Raters Movie Recommendations : Sign up on iOS, Android, or Web';
export const LOGIN_META_DESCRIPTION =
  'Join Raters and get instant personalized film recommendations from people you trust! Raters is available in 11 languages.';
export const EXPLORE_META_TITLE =
  'Raters: First movie platform with recommendations for groups of people';
export const EXPLORE_META_DESCRIPTION =
  'Get instant film suggestions from people you trust. Tag your friends or better half and get film recommendations that all of you will like!';
export const SEARCH_META_DESCRIPTION =
  'Search for films, actors and directors - all in one place.';
export const SEARCH_META_TITLE =
  'Search Raters: Movies, Crew, Users – all in one place';
export const COLLECTION_META_TITLE =
  'Raters Hand- picked Collections: Trending, Best of Decades, and more';
export const COLLECTION_META_DESCRIPTION =
  'Explore customized lists compiled of movies approved by your Raters friends. See what’s on on Netflix and Amazon, Oscar nominees, and others.';
export const SETTINGS_META_TITLE =
  'Your Raters Account: Rated, To Watch, Followers, and Following';
export const SETTINGS_META_DESCRIPTION =
  'Customize your Raters profile, including profile picture, username, language, and other settings. Keep track of movies you have rated and your watchlist.';
export const MAIN_META_TITLE =
  'Watch Movies Online🎬 –  ►Raters Movie Lovers Network';
export const MAIN_META_DESCRIPTION =
  'Online movie viewing service. ⭐New films and series in good quality. Best selection of films on Raters.';

export const GUEST_USER_ID = 45831;

const rawCountryCodes = `United Kingdom:GB
Afghanistan:AF
Albania:AL
Algeria:DZ
Andorra:AD
Angola:AO
Antigua and Barbuda:AG
Argentina:AR
Armenia:AM
Australia:AU
Austria:AT
Azerbaijan:AZ
Bahamas:BS
Bahrain:BH
Bangladesh:BD
Barbados:BB
Belarus:BY
Belgium:BE
Belize:BZ
Benin:BJ
Bhutan:BT
Bolivia:BO
Bosnia and Herzegovina:BA
Botswana:BW
Brazil:BR
Brunei Darussalam:BN
Bulgaria:BG
Burkina Faso:BF
Burundi:BI
Cabo Verde:CV
Cambodia:KH
Cameroon:CM
Canada:CA
Central African Republic:CF
Chad:TD
Chile:CL
China:CN
Colombia:CO
Comoros:KM
Congo:CG
Congo:CD
Costa Rica:CR
Côte d'Ivoire:CI
Croatia:HR
Cuba:CU
Cyprus:CY
Czechia:CZ
Denmark:DK
Djibouti:DJ
Dominica:DM
Dominican Republic:DO
Ecuador:EC
Egypt:EG
El Salvador:SV
Equatorial Guinea:GQ
Eritrea:ER
Estonia:EE
Eswatini:SZ
Ethiopia:ET
Fiji:FJ
Finland:FI
France:FR
Gabon:GA
Gambia:GM
Georgia:GE
Germany:DE
Ghana:GH
Greece:GR
Grenada:GD
Guatemala:GT
Guinea:GN
Guinea-Bissau:GW
Guyana:GY
Haiti:HT
Holy See:VA
Honduras:HN
Hungary:HU
Iceland:IS
India:IN
Indonesia:ID
Iran:IR
Iraq:IQ
Ireland:IE
Israel:IL
Italy:IT
Jamaica:JM
Japan:JP
Jordan:JO
Kazakhstan:KZ
Kenya:KE
Kiribati:KI
Korea:KR
Kuwait:KW
Kyrgyzstan:KG
Lao People's Democratic Republic:LA
Latvia:LV
Lebanon:LB
Lesotho:LS
Liberia:LR
Libya:LY
Liechtenstein:LI
Lithuania:LT
Luxembourg:LU
Madagascar:MG
Malawi:MW
Malaysia:MY
Maldives:MV
Mali:ML
Malta:MT
Marshall Islands:MH
Mauritania:MR
Mauritius:MU
Mexico:MX
Micronesia:FM
Moldova:MD
Monaco:MC
Mongolia:MN
Montenegro:ME
Morocco:MA
Mozambique:MZ
Myanmar:MM
Namibia:NA
Nauru:NR
Nepal:NP
Netherlands:NL
New Zealand:NZ
Nicaragua:NI
Niger:NE
Nigeria:NG
North Macedonia:MK
Norway:NO
Oman:OM
Pakistan:PK
Palau:PW
Panama:PA
Papua New Guinea:PG
Paraguay:PY
Peru:PE
Philippines:PH
Poland:PL
Portugal:PT
Qatar:QA
Romania:RO
Russian Federation:RU
Rwanda:RW
Saint Kitts and Nevis:KN
Saint Lucia:LC
Saint Vincent and the Grenadines:VC
Samoa:WS
San Marino:SM
Sao Tome and Principe:ST
Saudi Arabia:SA
Senegal:SN
Serbia:RS
Seychelles:SC
Sierra Leone:SL
Singapore:SG
Slovakia:SK
Slovenia:SI
Solomon Islands:SB
Somalia:SO
South Africa:ZA
South Sudan:SS
Spain:ES
Sri Lanka:LK
Sudan:SD
Suriname:SR
Sweden:SE
Switzerland:CH
Syrian Arab Republic:SY
Tajikistan:TJ
Tanzania:TZ
Thailand:TH
Timor-Leste:TL
Togo:TG
Tonga:TO
Trinidad and Tobago:TT
Tunisia:TN
Turkey:TR
Turkmenistan:TM
Tuvalu:TV
Uganda:UG
Ukraine:UA
United Arab Emirates:AE
United States of America:US
Uruguay:UY
Uzbekistan:UZ
Vanuatu:VU
Venezuel:VE
Viet Nam:VN
Yemen:YE
Zambia:ZM
Zimbabwe:ZW`;

export const countryCodes = rawCountryCodes.split(/\r?\n/).map((item) => {
  const [key, value] = item.split(':');
  return {
    name: key.trim(),
    code: value,
  };
});

export const languageCodes = {
  default: 'English',
  az: 'Azərbaycanca',
  de: 'Deutsch',
  es: 'Español',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
  tr: 'Türkçe',
  ru: 'Русский',
  uk: 'Українська',
};

export const baseRouteUrl =
  '/:locale(en|pt|ru|az|de|es|fr|it|tr|uk|id|ca|cs|da|hr|hu|ms|nl|pl|ro|sk|fi|sv|tl|vi|el|kk|ka|hi|bn|pa|th|ko|cn|ja|nb)?';
export const baseUrl = (lang: string) => {
  return lang === 'en' ? '' : '/' + lang;
};
