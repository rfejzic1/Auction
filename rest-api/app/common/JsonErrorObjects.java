package common;

import com.fasterxml.jackson.databind.JsonNode;
import play.libs.Json;

import static common.Constants.*;
import static play.mvc.Http.Status.*;

public class JsonErrorObjects {
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

    public static JsonNode error(String message) {
        return Json.newObject().put(Fields.MESSAGE, message);
    }
}
