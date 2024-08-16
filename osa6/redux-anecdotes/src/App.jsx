import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getAnecdotes, updateAnecdote } from './services/anecdotes'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotification, setNotification } from './NotificationContext'
import { useContext } from 'react'

const App = () => {
  const queryClient = useQueryClient()
  const [, dispatch] = useNotification()
  

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: (updatedAnecdote) => {
      queryClient.setQueryData(['anecdotes'], (oldAnecdotes) => {
        return oldAnecdotes.map((anecdote) =>
          anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
      )
    })
    setNotification(dispatch, `voted for anecdote: ${updatedAnecdote.content}`, 5)
  },
})

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (result.isLoading) {
    return <div>loading ...</div>
  }

  if (result.isError) {
    return <div>SERVICE NOT AVAILABLE</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />

    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App