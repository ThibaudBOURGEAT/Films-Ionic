import { MediaPage } from '../pages/media/media';
import { FavoritesPage } from '../pages/favorites/favorites';

export const PAGES = {
  films: { page:MediaPage , params: "movie" },
  series: { page:MediaPage , params: "series" },
  favorites: { page:FavoritesPage, params:"" }
}
