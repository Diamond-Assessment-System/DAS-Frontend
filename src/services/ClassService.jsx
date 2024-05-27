import { api, auth } from "apis";
import { API } from "apis/constant";

export class ClassService {
  static async getAll(token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.CLASS, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async getOwnClass(token, params) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.CLASS + `/own-class`, {
          headers: headers,
          params: params,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async create(data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.post(API.CLASS, data, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async addStudent(id, data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.post(API.CLASS + `/${id}/students`, data, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async importStudent(id, data, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        headers["Content-Type"] = "multipart/form-data";
        const response = await api.post(
          API.CLASS + `/${id}/import-students`,
          data,
          {
            headers: headers,
            params: {
              classId: id,
            },
          }
        );

        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          console.log(response.data.message);

          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
        console.log("hello");
      }
    });
  }

  static async deleteStudent(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.delete(API.CLASS + `/students/${id}`, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async getClassById(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.CLASS + `/${id}`, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
  static async getClassByParams(params, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.get(API.CLASS + `/combo-class`, {
          headers: headers,
          params: params,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }

  static async delete(id, token) {
    return new Promise(async (resolve, reject) => {
      try {
        const headers = auth(token);
        const response = await api.delete(API.CLASS + `/${id}`, {
          headers: headers,
        });
        if (response.status === 200 && response.data) {
          resolve(response.data);
        } else {
          reject(response.data.message);
        }
      } catch (error) {
        reject(error.message);
      }
    });
  }
}
