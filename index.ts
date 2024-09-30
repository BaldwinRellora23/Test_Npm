export interface test {
  Name: string;
  Age: number;
}

export const logMessage = (entity: test) => {
  console.log("Name: " + entity.Name + " ,Age : " + entity.Age);
};
