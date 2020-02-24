package common;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;

import static common.Constants.*;
import static play.mvc.Http.Status.*;

public class JsonResponseObjects {
    public static JsonNode jsonStatus(Integer status, String message) {
        return Json
                .newObject()
                .put(Fields.STATUS, status)
                .put(Fields.MESSAGE, message);
    }

    public static JsonNode json500(String message) {
        return jsonStatus(INTERNAL_SERVER_ERROR, message);
    }

    public static JsonNode json404(String message) {
        return jsonStatus(NOT_FOUND, message);
    }

    public static JsonNode json401(String message) {
        return jsonStatus(UNAUTHORIZED, message);
    }

    public static JsonNode jsonUnauthorized() {
        return json401(Messages.UNAUTHORIZED);
    }

    public static JsonNode error(String message) {
        return Json.newObject().put(Fields.MESSAGE, message);
    }

    public static JsonNode json422(String message) {
        return jsonStatus(UNPROCESSABLE_ENTITY, message);
    }
}
