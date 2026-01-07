import Welcome from "./Welcome";
import UsersSection from "./sections/UsersSection";
import CreatorsSection from "./sections/CreatorsSection";
import ArtworksSection from "./sections/ArtworksSection";
import RequestsSection from "./sections/RequestsSection";

export const dashboardRoutes = (openModal, refreshKey) => [
  { path: "/", element: <Welcome /> },
  {
    path: "/users",
    element: <UsersSection openModal={openModal} refreshKey={refreshKey} />,
  },
  {
    path: "/creators",
    element: <CreatorsSection openModal={openModal} refreshKey={refreshKey} />,
  },
  {
    path: "/artworks",
    element: <ArtworksSection openModal={openModal} refreshKey={refreshKey} />,
  },
  {
    path: "/requests",
    element: <RequestsSection openModal={openModal} refreshKey={refreshKey} />,
  },
];
