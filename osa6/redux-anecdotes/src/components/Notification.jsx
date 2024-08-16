// import { useQuery } from '@tanstack/react-query'

// const Notification = () => {
//   const notificationQuery = useQuery({
//     queryKey: ['notification'],
//     queryFn: () => '', // Initially empty
//     staleTime: Infinity // Prevent automatic refetching
//   })

//   const style = {
//     border: 'solid',
//     padding: 10,
//     borderWidth: 1,
//     marginBottom: 5
//   }

//   if (!notificationQuery.data) return null

//   return (
//     <div style={style}>
//       {notificationQuery.data}
//     </div>
//   )
// }

// export default Notification