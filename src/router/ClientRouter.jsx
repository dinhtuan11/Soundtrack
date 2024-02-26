import AppLayout from "src/layouts/AppLayout";
import ArtistContainer from "src/pages/client/artist/ArtistContainer";
import ArtistDetailContainer from "src/pages/client/artist/artistDetail/ArtistDetailContainer";
import Home from "src/pages/client/home/Home";
import ProfileUser from "src/pages/client/profile/ProfileUser";
import Premium from "src/pages/client/premium/Premium";
import UpdatePage from "src/pages/exeption/updatePage";

export const CLIENT_ROUTE = {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home/>
      },
      {
        path: '/albums',
        element: <UpdatePage/>
      },
      {
        path: '/profile-user',
        element: <ProfileUser/>
      }, 
      {
        path: '/premium',
        element: <Premium/>
      }, 
      {
        path: '/artist',
        element: <ArtistContainer/>
      }, 
      {
        path: '/artist/:id',
        element: <ArtistDetailContainer/>,
      },
      {
        path: "/podcast",
        element: <UpdatePage/>
      },
      {
        path: "/recently",
        element: <UpdatePage/>
      },
      {
        path: "/favorites",
        element: <UpdatePage/>
      },
      {
        path: "/local-files",
        element: <UpdatePage/>
      },
      {
        path: "/lo-fi",
        element: <UpdatePage/>
      },
      {
        path: "/best-of-jovi",
        element: <UpdatePage/>
      },
      {
        path: "/best-of-mayer",
        element: <UpdatePage/>
      },
    ],
  }