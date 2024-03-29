import './Profile.css'
import { uploads } from '../../utils/config'

//components
import Message from '../../components/Message'
import { Link } from 'react-router-dom'
import { BsFillEyeFill, BsPencilFill, BsXLg } from 'react-icons/bs'

//hooks:
import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

//redux:
import { getUserDetails } from '../../slices/userSlice'
import {
  publishPhoto,
  resetMessage,
  getUserphotos,
} from '../../slices/photoSlice'

const Profile = () => {
  const { id } = useParams()

  const dispatch = useDispatch()

  const { user, loading } = useSelector((state) => state.user)
  const { user: userAuth } = useSelector((state) => state.auth)
  const {
    photos,
    loading: loadingPhoto,
    message: messagePhoto,
    error: errorPhoto,
  } = useSelector((state) => state.photo)

  const [title, setTitle] = useState('')
  const [image, setImage] = useState('')

  //functions

  //New form and edit form refs
  const newPhotoForm = useRef()
  const editPhotoForm = useRef()

  //Load user data:
  useEffect(() => {
    dispatch(getUserDetails(id))
    dispatch(getUserphotos(id))
  }, [dispatch, id])

  const handleFile = (e) => {
    const image = e.target.files[0]

    setImage(image)
  }

  //reset component message

  //Publish new photo
  const submitHandle = (e) => {
    e.preventDefault()

    const photoData = {
      title,
      image,
    }

    //build form data
    const formData = new FormData()

    const photoFormData = Object.keys(photoData).forEach((key) =>
      formData.append(key, photoData[key])
    )

    formData.append('photo', photoFormData) // photo is obj

    dispatch(publishPhoto(formData))

    setTitle(' ')

    setTimeout(() => {
      dispatch(resetMessage())
    }, 2000)
  }

  if (loading) {
    return <p>Caregando...</p>
  }

  return (
    <div id="profile">
      <div className="profile-header">
        {user.profileImage && (
          <img src={`${uploads}/users/${user.profileImage}`} alt={user.name} />
        )}
        <div className="profile-description">
          <h2>{user.name}</h2>
          <h2>{user.bio}</h2>
        </div>
      </div>
      {id === userAuth._id && (
        <>
          <div className="new-photo" ref={newPhotoForm}>
            <h3>Compartilhe algum momento seu: </h3>
            <form onSubmit={submitHandle}>
              <label>
                <span>Título para a foto:</span>
                <input
                  type="text"
                  placeholder="Insira um título"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title || ''}
                />
              </label>
              <label>
                <span>Imagem:</span>
                <input type="file" onChange={handleFile} />
              </label>
              {!loadingPhoto && <input type="submit" value="Postar" />}
              {loadingPhoto && (
                <input type="submit" disabled value="Aguarde..." />
              )}
            </form>
          </div>
          {errorPhoto && <Message msg={errorPhoto} type="error" />}
          {messagePhoto && <Message msg={messagePhoto} type="success" />}
        </>
      )}
    </div>
  )
}
export default Profile
