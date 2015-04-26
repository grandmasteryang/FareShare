# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Taxis"
      id: "home"
      location: "example#getting-started" # Supersonic module#view type navigation
    }
    {
      title: "Form Party"
      id: "form-party"
      location: "example#form-party"
    }
    {
      title: "My Taxis"
      id: "my-taxi"
      location: "example#my-taxi"
    }
    #{
    #  title: "My Taxi"
    #  id: "my-taxi"
    #  #location: "userTable#index" # URLs are supported!
    #  location: "example#login"
    #}
  ]
  rootView:
      location: "example#getting-started"

  initialView:
    id: "initialView"
    location: "example#login"

  preloads: [
    {
      id: "full-details"
      location: "example#full-details"
    }
  ]

  # drawers:
  #   left:
  #     id: "leftDrawer"
  #     location: "example#drawer"
  #     showOnAppLoad: false
  #   options:
  #     animation: "swingingDoor"
  #
  # initialView:
  #   id: "initialView"
  #   location: "example#initial-view"
