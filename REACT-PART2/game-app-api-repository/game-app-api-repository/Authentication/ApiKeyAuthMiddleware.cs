using Microsoft.Extensions.Primitives;
using Microsoft.IdentityModel.Protocols;

namespace game_app_api_repository.Authentication
{
    public class ApiKeyAuthMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IConfiguration _configuration;

        public ApiKeyAuthMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {

            //auth via Params - Query Params
            //if (context.Request.QueryString.HasValue == false)
            //{
            //    context.Response.StatusCode = 401;
            //    await context.Response.WriteAsync("API Param is missing");
            //    return;
            //}

            //if (context.Request.Query[AuthConstant.ApiQueryParamsHeaderName] != AuthConstant.ApiQueryParamsHeaderKey)
            //{
            //    context.Response.StatusCode = 401;
            //    await context.Response.WriteAsync("Invalid Param Key");
            //    return;
            //}

            //auth via Headers api-key
            if (!context.Request.Headers.TryGetValue(AuthConstant.ApiKeyHeaderName, out var extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("API Key missing");
                return;
            }

            var apiKey = "b07131600ee34def946ad3228a9a8af4";

            if (!apiKey.Equals(extractedApiKey))
            {
                context.Response.StatusCode = 401;
                await context.Response.WriteAsync("Invalid API Key");
                return;
            }

            await _next(context);
        }
    }
}
