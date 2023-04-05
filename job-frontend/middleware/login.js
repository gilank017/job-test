export default function (context) {
  if (!context.store.getters.isLogin) {
    return context.redirect('/?unauthorized')
  }
}