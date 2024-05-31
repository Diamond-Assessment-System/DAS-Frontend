import { api, auth } from "apis";
import { API } from "apis/constant";

export class ExamService {
  static async getOwnExam( params, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.EXAM + `/own-exam`, {
          headers: headers,
          params: params,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async getExamById( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.EXAM + `/${ id }`, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async getResourceByExamId( id, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.EXAM + `/${ id }/resource`, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async addMatrix( data, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.post( API.EXAM + `/matrix`, data, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          console.log( "response", response );
          reject( response.data.message );
        }
      } catch ( error ) {
        console.log( "error", error );
        console.log( "error.response", error.response.data );
        reject( error.response.data.message );
      }
    } );
  }
  static async getDowloadExam( token, examId ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get( API.EXAM + `/${ examId }/resource`, {
          headers: headers,
        } );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
  static async exportResult( examId, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.put(
          API.EXAM + `/${ examId }/calculate-all`,
          {},
          {
            headers: headers,
          }
        );
        if ( response.status === 200 && response.data ) {
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
<<<<<<< Updated upstream
        reject( error.message );
=======
        reject( error.response.data );
>>>>>>> Stashed changes
      }
    } );
  }
  static async downloadResult( examId, token ) {
    return new Promise( async ( resolve, reject ) => {
      try {
        const headers = auth( token );
        const response = await api.get(
          API.EXAM + `/export-result?examId=${ examId }`,
          {
            headers: {
              ...headers,
              Accept: "text/plain",
            },
            responseType: "blob", // ensure the response data is received as a Blob
          }
        );

        if ( response.status === 200 && response.data ) {
          const url = window.URL.createObjectURL( new Blob( [ response.data ] ) );
          const link = document.createElement( "a" );
          link.href = url;

          // Extract filename from the Content-Disposition header
          const contentDisposition = response.headers[ "content-disposition" ];
          console.log( "contentDisposition", response );
          let filename = "result.xlsx"; // Default filename
          if ( contentDisposition ) {
            //TODO api add the file name to it
            const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
            const matches = contentDisposition.match( filenameRegex );
            if ( matches != null && matches[ 1 ] ) {
              filename = matches[ 1 ].replace( /['"]/g, "" );
            }
          }

          link.setAttribute( "download", filename ); // Use the extracted filename
          document.body.appendChild( link );
          link.click();
          resolve( response.data );
        } else {
          reject( response.data.message );
        }
      } catch ( error ) {
        reject( error.message );
      }
    } );
  }
}
