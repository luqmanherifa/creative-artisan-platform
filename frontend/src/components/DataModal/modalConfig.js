import UserForm from "./forms/UserForm";
import CreatorForm from "./forms/CreatorForm";
import ArtworkForm from "./forms/ArtworkForm";
import RequestForm from "./forms/RequestForm";

import UserView from "./views/UserView";
import CreatorView from "./views/CreatorView";
import ArtworkView from "./views/ArtworkView";
import RequestView from "./views/RequestView";

export const modalConfig = {
  User: {
    Form: UserForm,
    View: UserView,
  },
  Creator: {
    Form: CreatorForm,
    View: CreatorView,
  },
  Artwork: {
    Form: ArtworkForm,
    View: ArtworkView,
  },
  Request: {
    Form: RequestForm,
    View: RequestView,
  },
};
