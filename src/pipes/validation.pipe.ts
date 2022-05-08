import { ArgumentMetadata, Injectable, PipeTransform } from "@nestjs/common";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { ValidationException } from "src/exceptions/validation.exception";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const obj = plainToClass(metadata.metatype, value);
    const errors = await validate(obj);

    if (errors.length) {
      console.log(errors);
      //   let messages = errors.map((err) => `${err.property}`);
      throw new ValidationException("");
    }
    return value;
  }
}
