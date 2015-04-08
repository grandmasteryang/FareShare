# Read more about app structure at http://docs.appgyver.com

module.exports =

  # See styling options for tabs and other native components in app/common/native-styles/ios.css or app/common/native-styles/android.css
  tabs: [
    {
      title: "Home"
      id: "home"
      location: "example#getting-started" # Supersonic module#view type navigation
    }
    {
      title: "Form Party"
      id: "form-party"
      location: "example#form-party"
    }
    {
      title: "My Taxi"
      id: "my-taxi"
      location: "http://maps.google.com" # URLs are supported!
    }
  ]
  rootView:
      location: "example#getting-started"

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
