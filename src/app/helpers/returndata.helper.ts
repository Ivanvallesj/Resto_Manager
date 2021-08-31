import firebase from 'firebase'

export const retornaData = (snapshot : firebase.firestore.QuerySnapshot ) => {
    const documentos : any[] = [];
    snapshot.forEach(sh => {
        documentos.push({
          id: sh.id,
          ...sh.data()
        })
      })
    return documentos
}