export const handleAuthClick = (action, loading, currentUser, router) => {
  return () => {
    if (loading) return;

    if (!currentUser) {
      router.push('/login');
    } else {
      action();
    }
  };
}
